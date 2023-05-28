Site.Elements.define("ca-logo-switcher", Base => class extends Base {
    /** @this {HTMLElement} */
    async connectedCallback() {
        const document = this.ownerDocument;
        const window = document.defaultView;

        const globalLogo = document?.querySelector("header [is-logo]");
        if (!("IntersectionObserver" in window) || !globalLogo) {
            return;
        }

        this._observer = new window.IntersectionObserver((...args) => {
            this.updateView(...args);
        });
        this._observer.observe(globalLogo);
    }
    disconnectedCallback() {
        this._observer.disconnect();
        this._observer = null;
    }

    updateView([{ isIntersecting }]) {
        const globalLogoIsVisible = isIntersecting;
        const def = this.querySelector("[default-label]");
        const fancy = this.querySelector("[fancy-label]");

        if (globalLogoIsVisible) {
            def.classList.remove("hidden");
            fancy.classList.add("hidden");
            fancy.classList.remove("fade-in-smooth");
        } else {
            def.classList.add("hidden");
            fancy.classList.remove("hidden");
            fancy.classList.add("fade-in-smooth");
        }
    }
});
