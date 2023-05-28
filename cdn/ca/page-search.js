Site.Elements.define("ca-page-search", (Base, { subscribe }) => class extends Base {
    /** @this {HTMLElement} */
    connectedCallback() {
        this._unsubs = [];

        const document = this.ownerDocument;
        const input = this._input = this.querySelector("input[type=text]");
        const resetButton = this._resetButton = this.querySelector("button[type=reset]");

        if (!input) {
            // FIXME: Do we need usage warnings for dev time?
            //throw new Error("<ca-page-search> needs an <input> child");
            return;
        }

        const throttledUpdate = Base.throttle(() => this.updateView());

        const onInput = (ev) => {
            ev.stopPropagation();
            throttledUpdate();
        };
        input.addEventListener("input", onInput);
        this._unsubs.push(() => {
            this._input.removeEventListener("input", onInput);
        });

        const onBlur = () => {
            return this.updateView()
        };
        input.addEventListener("blur", onBlur);
        this._unsubs.push(() => {
            this._input.removeEventListener("blur", onBlur);
        });

        const onKeydown = (ev) => {
            if (ev.key === "Escape") {
                this._input.value = "";
                this._input?.blur();
            }
        };
        input.addEventListener("keydown", onKeydown);
        this._unsubs.push(() => {
            this._input.removeEventListener("keydown", onKeydown);
        });

        const onClickReset = () => {
            this._input.value = "";
            this.updateView();
        };
        resetButton.addEventListener("click", onClickReset);
        this._unsubs.push(() => {
            this._resetButton.removeEventListener("click", onClickReset);
        });

        this._unsubs.push(subscribe("app.hotkey", ({ key }) => {
            switch (key) {
                case "/":
                    if (document.activeElement !== this._input) {
                        this._input?.focus();
                    }
                    break;
                default:
                    break;
            }
        }));

        this.updateView();
    }
    disconnectedCallback() {
        this._unsubs.forEach(unsub => unsub());
        this._unsubs = null;
        this._input = null;
        this._resetButton = null;
    }

    updateView() {
        /** @type {Document} */
        const document = this.ownerDocument;
        const term = this._input?.value?.toLowerCase() ?? "";
        const categories = document.querySelectorAll("main [ca-category]");

        if (term.length === 0) {
            this._resetButton.disabled = true;
            document.body.classList.remove("searching");
            for (const category of categories) {
                const items = category.querySelectorAll("[ca-searchable]");
                for (const it of items) {
                    it.classList.remove("hidden");
                }
                category.classList.remove("hidden");
            }
        } else {
            this._resetButton.disabled = false;
            document.body.classList.add("searching");
            for (const category of categories) {
                const items = category.querySelectorAll("[ca-searchable]");
                let matches = 0;
                for (const it of items) {
                    if (it.innerText?.toLowerCase().indexOf(term) >= 0) {
                        matches += 1;
                        it.classList.remove("hidden");
                    } else {
                        it.classList.add("hidden");
                    }
                }
                if (matches > 0) {
                    category.classList.remove("hidden");
                } else {
                    category.classList.add("hidden");
                }
            }
        }
    }
});
