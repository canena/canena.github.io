define(["require"], function (require) {

    function boot(ev) {
        ev.target.removeEventListener("click", boot);
        require(["demos/water/water"]);
    }

    const start = document.querySelector(".code-demo.water [data-trigger='water.start']");
    start.addEventListener("click", boot);
    start.disabled = false;
});
