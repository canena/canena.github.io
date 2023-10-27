export {
    createSanitize,
    createThrottle,
}

// Site Composition Root
// =====================

Hub.use(({ env, fromJson, toJson }) => {
    const window = env.window;

    class Scheduler {
        /** @param {number} handle */
        cancel(handle) {
            throw new Error("Not implemented!");
        }
        /**
         * @param {FrameRequestCallback} fn
         * @returns {number} handle
         */
        schedule(fn) {
            throw new Error("Not implemented!");
        }
    }
    class Store {
        /** @param {string} key */
        getItem(key) {
            throw new Error("Not implemented!");
        }
        /**
         * @param {string} key
         * @param {any} value
         */
        setItem(key, value) {
            throw new Error("Not implemented!");
        }
    }

    const knownCapabilities = {
        Scheduler,
        Store,
    };
    const capabilitiesByRef = new WeakMap();

    class LocalStorageStore extends Store {
        getItem(key) {
            return fromJson(window.localStorage.getItem(key));
        }
        setItem(key, value) {
            return window.localStorage.setItem(key, toJson(value));
        }
    }
    /** @type {Store} */
    let defaultStore = new LocalStorageStore();
    try {
        defaultStore.setItem("navigator.supports.localStorage", true);
    } catch (e) {
        defaultStore = {
            getItem() {},
            setItem() {}
        };
    }
    capabilitiesByRef.set(Store, () => defaultStore);

    class RequestAnimationFrameScheduler extends Scheduler {
        cancel(handle) {
            window.cancelAnimationFrame(handle);
        }
        schedule(fn) {
            return window.requestAnimationFrame(fn);
        }
    }
    /** @type {Scheduler} */
    const defaultScheduler = new RequestAnimationFrameScheduler();
    capabilitiesByRef.set(Scheduler, () => defaultScheduler);

    // Custom Element API
    // ==================
    // We provide a thin abstraction for the standard Custom Element API that
    // also provides access to basic inversion of control capabilities. No need for an
    // external library.

    class BaseElement extends HTMLElement {
        static dependencies = [];

        // FIXME: Find a nicer place for helpers like "throttle"
        static throttle = createThrottle(window);
        static sanitize = createSanitize(window);
    }
    env.define("Site.Elements.define", function defineCustomElement(tagName, factory) {
        if (window.customElements.get(tagName)) {
            throw new Error(`Element "${tagName}" cannot be overwritten`);
        }
        console.log(`Defining <${tagName}> ...`);

        Hub.use(sandbox => {
            const Self = factory(BaseElement, sandbox, knownCapabilities);
            const Connected = class extends Self {
                constructor() {
                    const deps = (Connected?.dependencies ?? []).map(ref => {
                        const factory = capabilitiesByRef.get(ref);
                        return factory();
                    });
                    super(...deps);
                }
            }
            Site.Elements[tagName] = Connected;
            window.customElements.define(tagName, Connected);
        });
    });
});

/**
 * @param {Window} window
 * @param {number} frequencyHz
 */
function createThrottle(window, frequencyHz = 5) { // 200ms
    const clearTimeout = window.clearTimeout;
    const setTimeout = window.setTimeout;

    return function throttle(fn, timeframeMs = 1000 / frequencyHz) {
        let timerHandle = null;
        let mostRecentArgs;
        return function throttled() {
            if (timerHandle) {
                mostRecentArgs = [...arguments];
                clearTimeout(timerHandle);
                timerHandle = null;
            }

            timerHandle = setTimeout(() => {
                try {
                    fn.apply(this, mostRecentArgs);
                } catch (e) {
                    // FIXME: Error-handling in "throttle" helper?
                } finally {
                    timerHandle = null;
                    mostRecentArgs = null;
                }
            }, timeframeMs);
        };
    };
}

/**
 * @param {Window} window
 */
function createSanitize(window) {
    if (!("DOMParser" in window)) {
        throw new Error("DOMParser API needs to be supported");
    }
    if (!("XMLSerializer" in window)) {
        throw new Error("XMLSerializer API needs to be supported");
    }
    if (!("NodeIterator" in window)) {
        throw new Error("NodeIterator API needs to be supported");
    }

    const NodeFilter = window.NodeFilter;
    const allowedNodes = new Set([
        "a",
        "b",
        "blockquote",
        "body",
        "br",
        "code",
        "em",
        "h3",
        "h4",
        "h5",
        "h6",
        "i",
        "p",
        "#text",
    ]);

    /** @param {Document} document */
    function purge(document) {
        const evilIterator = document.createNodeIterator(
            document.body,
            NodeFilter.SHOW_ALL,
            node => {
                const isAllowed = allowedNodes.has(node.nodeName.toLowerCase());
                if (!isAllowed) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                for (const attr in node) {
                    if (/^on/i.test(attr)) {
                        const value = node.getAttribute(attr);
                        if (value) {
                            node.setAttribute(attr, "");
                        }
                    }
                }

                node.style = null;
                // node.setAttribute?.("style", "");
                node.removeAttribute?.("style");

                return NodeFilter.FILTER_SKIP;
            }
        );

        let node;
        while (node = evilIterator.nextNode()) {
            node.parentNode.removeChild(node);
        }
        node = null;

        return document;
    }

    /** @param {string} unsafeHtml */
    return function sanitize(unsafeHtml) {
        const parser = new window.DOMParser();
        const unsafe = parser.parseFromString(unsafeHtml, "text/html");

        const safe = purge(unsafe);

        const serializer = new window.XMLSerializer();
        const safeHtml = serializer.serializeToString(safe);
        return safeHtml;
    }
}
