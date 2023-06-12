Site.Elements.define("ca-debug", (Base, { forEach, subscribe }) => class extends Base {
    /** @this {HTMLElement} */
    connectedCallback() {
        const fragment = this.querySelector("template").content.cloneNode(true);
        this.appendChild(fragment);

        this._out = this.querySelector(".out");
        this._count = 0;

        const sub = subscribe("DBG.log");
        forEach(args => this.appendMessage(...args))(sub);
        this._unsub = sub.unsubscribe;
    }
    disconnectedCallback() {
        this._unsub();
    }

    appendMessage(msg) {
        this._count += 1;
        const pre = this.ownerDocument.createElement("pre");
        pre.innerHTML = `[${String(this._count).padStart(5, "0")}] [${new Date().toISOString()}] ${msg}`;
        this._out.insertBefore(pre, this._out.firstChild);
    }
})
