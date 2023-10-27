// FIXME: <ca-bg-parallax> not ready yet
Site.Elements.define("ca-bg-parallax", (Base, { subscribe }) => class extends Base {
    connectedCallback() {
        // const document = this.ownerDocument;

        // this._elements = document.querySelectorAll("[parallax]");

        // this._unsub = subscribe("document.scroll", (...args) => {
        //     this.updateView(...args);
        // });
    }
    disconnectedCallback() {
        // this._unsub();
    }

    /** @param {ScrollEventData} ev */
    updateView(ev) {
        const SLOWDOWN = 0.5;

        for (const element of this._elements) {
            const t = ev.scrollY * SLOWDOWN;
            element.style.transform = `perspective(10cm) translateY(${t}px)`;
        }
    }
});
