function formatDate(date) {
    return new Date(date).toLocaleString('en-us', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

// The idea to re-purpose GitHub issues as a comment section is stolen
// from https://blogs.cuttingedge.it/steven and https://blog.ploeh.dk/
Site.Elements.define("ca-gh-comments", (Base, { request }) => class extends Base {
    static get observedAttributes() {
        return ["issue"];
    }
    /** @this {HTMLElement} */
    connectedCallback() {
        const document = this.ownerDocument;
        const window = document.defaultView;
        if (!("IntersectionObserver" in window)) {
            // If this browser doesn't support IntersectionObserver we don't
            // bother with the comments
            return;
        }

        this._observer = new window.IntersectionObserver(entries => {
            this.visibilityChanged(entries);
        });
        this._observer.observe(this);
    }
    disconnectedCallback() {
        this._observer.disconnect();
        this._observer = null;
    }
    attributeChangedCallback(name, oldValue, value) {
        switch (name) {
            case "issue":
                this._loaded = false;
                this._issue = value;
                this.maybeLoadComments();
                break;
            default:
                break;
        }
    }

    /** @param {IntersectionObserverEntry[]} */
    visibilityChanged([{ isIntersecting }]) {
        if (!isIntersecting) {
            this._visible = false;
            return;
        }

        this._visible = true;
        this.maybeLoadComments();
    }
    /** @this {HTMLElement} */
    async maybeLoadComments() {
        if (!this._visible || !this._issue || this._loaded) {
            return;
        }

        const document = this.ownerDocument;

        this._loaded = true;
        const root = this.querySelector("[comments-container]");
        const status = this.querySelector("[comments-status]");
        status.innerHTML = "Loading comments...";

        const ul = root.querySelector("ul");

        try {
            // FIXME: Use GitHub GraphQL API to reduce transfer sizes?
            const res = await request.json(`${this._issue}/comments`, {
                headers: {
                    "Accept": "application/vnd.github.v3.html+json",
                },
            });
            const comments = res.response;

            if (comments?.length === 0) {
                status.innerHTML = "There are currently no comments available for this post."
            } else {
                const tmpl = this.querySelector("template");
                for (const comment of comments) {
                    const itemFragment = tmpl.content.cloneNode(true);
                    ul.appendChild(itemFragment);
                    const item = ul.querySelector("li:last-child");

                    const author = item.querySelector("[comment-author]");
                    author.href = comment.user.html_url;
                    const authorName = comment.user.login === "mfeineis" ? "Moderator" : comment.user.login;
                    author.appendChild(document.createTextNode(authorName));

                    const title = author.parentNode;
                    title.id = `comment-${comment.id}`;

                    const createdAt = item.querySelector("[comment-created]");
                    createdAt?.appendChild(document.createTextNode(
                        formatDate(comment.created_at)
                    ));
                    if (comment.created_at !== comment.updated_at) {
                        const edited = item.querySelector("[comment-edited]");
                        edited?.appendChild(document.createTextNode(
                            `(edited ${formatDate(comment.updated_at)})`
                        ));
                    }

                    // This is the internet, we trust nobody here
                    const body = item.querySelector("[comment-body]");
                    const unsafe = comment.body_html;
                    const safe = Base.sanitize(unsafe);
                    body.innerHTML = safe;
                    status.innerHTML = "";
                }
            }
        } catch (e) {
            root.innerHTML = `
                <b>Oops, something went wrong loading the comments.</b>
            `;
            throw e;
        }
    }
});
