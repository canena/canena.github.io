// See https://shahriyarshahrabi.medium.com/gentle-introduction-to-fluid-simulation-for-programmers-and-technical-artists-7c0045c40bac

const width = 800;
const height = 600;
const fps = 60; //24; //6;
const threshold = 1000 / fps;
const syncIterations = 20;
/** @type {CanvasRenderingContext2D} */
let ctx;
let lastTime = 0;
let rows = 60;
let cols = 80;
let w = width / cols;
let h = w;
let i, j, val, dt, t;
let n11, n12, n13, n21, n22, n23, n31, n32, n33;
let drop;
const buf = new Array(cols * rows);
buf.fill(0);
const buf2 = new Array(cols * rows);
const userBuf = new Array(cols * rows);
userBuf.fill(0);
const diffusionFactor = 0.27;

function compute(x, y, dt) {
    // if (isSource(x, y)) {
    //     return 1;
    // }
    if (x === 0 || y === 0 || x === cols - 1 || y === rows - 1) {
        // return (y / rows + (Math.random() / 500) * x) * 0.7;
        return 0;
    }
    n11 = buf[(y - 1) * cols + (x - 1)]; n12 = buf[(y - 1) * cols + (x + 0)]; n13 = buf[(y - 1) * cols + (x + 1)];
    n21 = buf[(y + 0) * cols + (x - 1)]; n22 = buf[(y + 0) * cols + (x + 0)]; n23 = buf[(y + 0) * cols + (x + 1)];
    n31 = buf[(y + 1) * cols + (x - 1)]; n32 = buf[(y + 1) * cols + (x + 0)]; n33 = buf[(y + 1) * cols + (x + 1)];

    // val = clamp(y / rows + (Math.random() / 1000) * x) * 0.7;
    drop = (0.3*n11 + 0.3*n12 + 0.6*n13 +
            0.5*n21 + 1.0*0.0 + 0.5*n23 +
            0.4*n31 + 0.7*n32 + 0.7*n33
        - (4 * n22));
    val = n22 + diffusionFactor * drop + userBuf[y * cols + x];
    // y === 1 && x === cols / 2 && console.log('val', x, y, t, '->', val);
    // return Math.floor(t / 1000) % 2 === 0 ? 1 : 0; // x % 2 === 0;
    return val;
}

function isSource(x, y) {
    return y === 0 && x === Math.floor(cols / 2);
}

function clamp(v) {
    return Math.min(1, Math.max(0, v));
}

Site.Elements.define("ca-intro", (Base, { env, log }, { Scheduler, Store }) => class extends Base {
    /** @param {number} time */
    loop(time) {
        this._iterations += 1;
        dt = time - lastTime;

        if (this._iterations >= syncIterations) {
            this._iterations = 0;
            this._running = this._store.getItem("shared.fx.active");
        }
        if (!this._running || dt < threshold) {
            this._handle = this._scheduler.schedule(this.loop);
            return;
        }
        lastTime = time;

        // log("loop", { dt, time });

        ctx = this._ctx;
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        // ctx.filter = "blur(2px)"
        // ctx.globalCompositeOperation = "lighter";
        // ctx.fillStyle = "green";
        // ctx.fillRect(50, 50, 400, 300);
        // w = width / cols;
        // h = height / rows;
        t = time;

        for (i = 0; i < rows; i += 1) {
            for (j = 0; j < cols; j += 1) {
                val = buf2[i * cols + j] = clamp(compute(j, i, dt / 1000));
                ctx.fillStyle = `rgba(255, 255, 255, ${val})`;
                ctx.fillRect(j * w, i * h, w, h);
                // ctx.ellipse(j * w, i * h, w / 2, h / 2, 0, 0, Math.PI);
                // ctx.fill();
                // ctx.strokeRect(j * w, i * h, w, h);
            }
        }

        buf.splice(0, buf2.length, ...buf2);
        userBuf.fill(0);

        this._handle = this._scheduler.schedule(this.loop);
    }

    static get dependencies() {
        return [Scheduler, Store]
    }
    /**
     * @param {Scheduler} scheduler
     * @param {Store} store
     */
    constructor(scheduler, store) {
        super();

        this.loop = this.loop.bind(this);

        this._scheduler = scheduler;
        this._store = store;

        this._subs = [];

        this._iterations = 0;

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

        // FIXME: Finish <ca-intro>
        return;

        this._canvas = root.querySelector("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._ctx = this._canvas.getContext("2d", {
            alpha: true,
        });
        this._running = true;

        function resize(ev) {
            console.log("resize", ev);
        }
        env.window.addEventListener("resize", resize);
        this._subs.push(() => env.window.removeEventListener("resize", resize));

        /** @param {MouseEvent} ev */
        function paint(ev) {
            const x = Math.floor(ev.offsetX / w);
            const y = Math.floor(ev.offsetY / h);
            userBuf[(y - 1) * cols + (x - 1)] = 0.5; userBuf[(y - 1) * cols + (x + 0)] = 0.7; userBuf[(y - 1) * cols + (x + 1)] = 0.5;
            userBuf[(y + 0) * cols + (x - 1)] = 0.7; userBuf[(y + 0) * cols + (x + 0)] = 1.0; userBuf[(y + 0) * cols + (x + 1)] = 0.7;
            userBuf[(y + 1) * cols + (x - 1)] = 0.5; userBuf[(y + 1) * cols + (x + 0)] = 0.7; userBuf[(y + 1) * cols + (x + 1)] = 0.5;
        }
        this._canvas.addEventListener("mousemove", paint);
        this._subs.push(() => this._canvas.removeEventListener("click", paint));
        this._canvas.addEventListener("click", paint);
        this._subs.push(() => this._canvas.removeEventListener("click", paint));

        this.loop();
    }
    disconnectedCallback() {
        if (this._handle) {
            this._scheduler.cancel(this._handle);
        }
        this._running = false;
        this._ctx = null;
        this._canvas = null;
        for (const unsub of this._subs) {
            unsub();
        }
    }
});
