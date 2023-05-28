Site.Elements.define("ca-billboard-dancer", Base => class extends Base {
    /** @this {HTMLElement} */
    connectedCallback() {
        const document = this.ownerDocument;
        const window = document.defaultView;

        if (!("IntersectionObserver" in window)) {
            return;
        }

        /** @type {IntersectionObserver} */
        this._observer = new window.IntersectionObserver((...args) => {
            this.updateView(...args);
        }, {
            rootMargin: "-40% -49% -40% -49%",
        });

        for (const billboard of document.querySelectorAll("[\\{billboard\\}]:not(body)")) {
            this._observer.observe(billboard);
        }
    }
    disconnectedCallback() {
        this._observer.disconnect();
        this._observer = null;
    }

    updateView(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                if (entry.target.getAttribute("{billboard}")?.includes("left")) {
                    entry.target.classList.add("present-billboard-left");
                } else {
                    entry.target.classList.add("present-billboard-right");
                }
            } else {
                if (entry.target.getAttribute("{billboard}")?.includes("left")) {
                    entry.target.classList.remove("present-billboard-left");
                } else {
                    entry.target.classList.remove("present-billboard-right");
                }
            }
        }
    }
});
