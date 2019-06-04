define(["greeshka"], function (G) {

    function polyfill(window) {
        if (typeof window.CustomEvent === "function") return;

        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent( 'CustomEvent' );
            evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    }

    polyfill(window);

    const Core = G(function (add) {

        add(function utils(Y) {
            Y.log = Y.log;
        });

        add(function pubsub$browser(Y) {
            const subs = [];

            function on(topic, fn) {
                Y.log("pubsub.on()", topic, fn);
                const fullTopic = "topic:" + topic;

                function callback(ev) {
                    fn.call(null, ev.detail);
                }

                document.addEventListener(fullTopic, callback);
                function dispose() {
                    Y.log("pubsub.on().dispose", topic, fn);
                    document.removeEventListener(fullTopic, callback);
                }
                subs.push(dispose);
                return dispose;
            }

            function emit(topic, data) {
                Y.log("pubsub.emit()", topic, data);
                const fullTopic = "topic:" + topic;
                document.dispatchEvent(new CustomEvent(fullTopic, {
                    detail: data,
                }));
            }

            Y.emit = emit;
            Y.on = on;

            return function dispose() {
                Y.log("pubsub.dispose()", "subs", subs);
                subs.forEach(function (sub) {
                    sub();
                });
            };
        });

    });

    Core.use(function (use) {
        use(function cleanup() {
            window.addEventListener("beforeunload", function (e) {
                Core.log("[core] onbeforeunload...");
                Core.stop();
            });
        });
    });

    return Core;
});
