Site.Elements.define("ca-intro", (Base, { log }, { Scheduler, Store }) => class extends Base {
    static get dependencies() {
        return [Scheduler, Store]
    }
    /**
     * @param {Scheduler} scheduler
     * @param {Store} store
     */
    constructor(scheduler, store) {
        super();

        this._scheduler = scheduler;
        this._store = store;

        log("deps", scheduler, store);
    }

    /** @this {HTMLElement} */
    connectedCallback() {
        let root = this;
        const tmpl = this.querySelector("template");
        if (tmpl) {
            const fragment = tmpl.content.cloneNode(true);
            root = this.attachShadow({ mode: "open" });
            root.appendChild(fragment);
        }

        this._canvas = root.querySelector("canvas");
        this._ctx = this._canvas.getContext("2d", {
            alpha: true,
        });
        this._running = true;

        this.loop();
    }
    disconnectedCallback() {
        if (this._handle) {
            this._scheduler.cancel(this._handle);
        }
        this._running = false;
        this._ctx = null;
        this._canvas = null;
    }

    loop(time) {
        log("loop", { time });

        const ctx = this._ctx;
        ctx.fillStyle = "green";
        ctx.fillRect(50, 50, 400, 300);

        if (this._running) {
            this._handle = this._scheduler.schedule(t => this.loop(t));
            this._running = false;
        }
    }
});
