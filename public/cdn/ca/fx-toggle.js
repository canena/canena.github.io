const FX_ACTIVE = "shared.fx.active";
// TODO: Microbench to check for low-spec devices?
const FX_ACTIVE_DEFAULT = true;

Site.Elements.define("ca-fx-toggle", (Base, _, { Store }) => class extends Base {
    static get dependencies() {
        return [Store];
    }
    /**
     * @param {Store} store
     */
    constructor(store) {
        super();
        this._store = store;
    }
    /** @this {HTMLElement} */
    connectedCallback() {
        this._html = this.ownerDocument.querySelector("html");
        const fxActive = this._store?.getItem(FX_ACTIVE) ?? FX_ACTIVE_DEFAULT;

        this._input = this.querySelector("input[type=checkbox]");
        this.updateInput(fxActive);

        const onToggle = (...args) => {
            this.updateView(...args);
        };
        this._input.addEventListener("change", onToggle);
        this._unsub = () => {
            this._input.removeEventListener("change", onToggle);
        };
    }
    disconnectedCallback() {
        this._unsub();
        this._html = null;
        this._input = null;
        this._store = null;
    }

    /** @param {Event} ev */
    updateView(ev) {
        this.updateInput(ev.target.checked);
    }
    updateInput(fxActive) {
        this._store?.setItem(FX_ACTIVE, fxActive);
        this._input.checked = fxActive;
        if (fxActive) {
            this._html.classList.add("fx");
        } else {
            this._html.classList.remove("fx");
        }
    }
});
