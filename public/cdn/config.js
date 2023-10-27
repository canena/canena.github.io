// Configuration is written in ES5 to not have it break in ancient environments
Hub.use(function (Y) {
    const env = Y.env;
    const document = env.document;

    // Feature flags
    // =============

    if (document.querySelector) {
        const html = document.querySelector("html");
        if (html.classList) {
            html.classList.remove("no-js");
            html.classList.add("js");
        }
    }

    function byMeta(feature) {
        return document.querySelector(`meta[name="hubjs:${feature}"]`);
    }

    env.define("Site.features.track", Boolean(byMeta("track")));
});
