Site.Elements.define("ca-reading-progress", (Base, { subscribe }) => class extends Base {
    /** @this {HTMLElement} */
    connectedCallback() {
        const document = this.ownerDocument;
        const root = this;

        this._unsub = subscribe("document.scroll", data => {
            this.updateProgress(data);
        });

        const tmpl = root.querySelector("template");
        if (!tmpl) {
            throw new Error("A <template> is required");
        }

        const fragment = tmpl.content.cloneNode(true);
        this.appendChild(fragment);

        this._percentage = 0;
        this._bar = this.querySelector("[data-bar]");
        this._toTopButtons = document.querySelectorAll("[back-to-top]")
        this.renderProgress();
    }
    disconnectedCallback() {
        this._unsub();
        this._bar = null;
        this._toTopButtons = null;
    }

    updateProgress(ev) {
        const maxScrollTop = ev.scrollHeight - ev.innerHeight;
        this._percentage = (100 / maxScrollTop) * ev.scrollY;
        this.renderProgress();
    }
    renderProgress() {
        if (this._percentage < 20) {
            for (const btn of this._toTopButtons) {
                btn.classList.add("hidden");
            }
        } else {
            for (const btn of this._toTopButtons) {
                btn.classList.remove("hidden");
            }
        }
        const sanitized = Math.min(100, Math.max(2, this._percentage ?? 0));
        this._bar.style.width = `${Math.round(sanitized)}%`;
    }
});
