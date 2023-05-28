// Word-count to reading time via https://doi.org/10.1016/j.jml.2019.104047
const wordsPerMinute = 183;

Site.Elements.define("ca-reading-meta", Base => class extends Base {
    /** @this {HTMLElement} */
    connectedCallback() {
        const document = this.ownerDocument;

        if (document.readyState !== 'loading') {
            this.analyzePage();
            return;
        }

        const window = document.defaultView;
        const onLoad = () => {
            window.removeEventListener("DOMContentLoaded", onLoad);
            this.analyzePage();
        };
        window.addEventListener("DOMContentLoaded", onLoad);
    }

    analyzePage() {
        const doc = this.ownerDocument;
        const article = doc.querySelector("main article");
        if (!article) {
            return;
        }

        const wordCount = article.innerText.trim().split(/\s+/g).length;
        const approxMin = Math.ceil(wordCount / wordsPerMinute);

        const usePlural = wordCount === 0 || wordCount > 1;
        const msg = doc.createTextNode(
            `Approximately ${approxMin} minute${usePlural ? "s" : ""} to read ${wordCount} word${usePlural ? "s" : ""}.`
        );
        this.appendChild(msg);
    }
});
