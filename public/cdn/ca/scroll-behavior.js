Site.Elements.define("ca-scroll-behavior", (Base, { publish }) => class extends Base {
    /** @this {HTMLElement} */
    connectedCallback() {
        const document = this.ownerDocument;

        const onScroll = Base.throttle(() => {
            this.broadcastState();
        }, 10);
        this._unsub = () => {
            document.removeEventListener("scroll", onScroll);
        };
        document.addEventListener("scroll", onScroll);

        this.broadcastState();
    }
    disconnectedCallback() {
        this._unsub();
    }

    broadcastState() {
        /** @type {Document} */
        const document = this.ownerDocument;
        const window = document.defaultView;

        const data = {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            scrollHeight: document.body.scrollHeight,
            scrollWidth: document.body.scrollWidth,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
        };
        publish("document.scroll", data);
    }
});
