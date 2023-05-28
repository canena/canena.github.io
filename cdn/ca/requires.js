// Needs to be an ES module for `import.meta` and `customElements`
export {};

// We want to be able to drop this module into a CDN and have it just work
let prefix = "x-";
let revision = "";
const baseUrl = import.meta.url.replace(/^(.+)\/(\w+)\/requires.js(?:\?([a-zA-Z][\w&=]*))?$/, (_, path, pre, hash) => {
    //console.log({ _, path, pre, hash });
    prefix = `${pre}-`;
    revision = hash;
    return `${path}/${pre}`;
});
const cache = new Set();

customElements.define(`${prefix}requires`, class extends HTMLElement {
    connectedCallback() {
        const document = this.ownerDocument;
        const elements = this.getAttribute("elements") ?? "";
        for (const rawDep of elements.split(" ")) {
            const dep = rawDep.trim();
            if (cache.has(dep)) {
                continue;
            }
            cache.add(dep);

            // Everything that uses this "-requires" element is guilty of
            // being an ES Module by association
            const node = document.createElement("script");
            node.type = "module";
            node.src = `${baseUrl}/${dep}.js${revision ? `?${revision}` : ""}`;
            node.defer = true;
            //node.onerror = function onerror() {
            //    log(`  <x-${dep}/> failed to load!`);
            //    //log(ev);
            //};
            //node.onload = function onload() {
            //    log(`  <x-${dep}/> loaded`);
            //};
            document.querySelector("head").appendChild(node);
        }
    }
});
