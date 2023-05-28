const cache = new Map();

customElements.define("include-partial", class extends HTMLElement {
    async connectedCallback() {
        const href = this.getAttribute("href");
        if (cache.has(href)) {
            const tmpl = cache.get(href);
            this.parentNode.replaceChild(tmpl.content.cloneNode(true), this);
            return;
        }

        const res = await fetch(href);
        const text = await res.text();
        const t = this.ownerDocument.createElement("template");
        t.innerHTML = text;
        cache.set(href, t);
        this.parentNode.replaceChild(t.content.cloneNode(true), this);
    }
});
