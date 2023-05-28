import { copy } from "https://deno.land/std@0.178.0/fs/copy.ts";
import { walk, WalkEntry } from "https://deno.land/std@0.178.0/fs/walk.ts";
import { dirname, join } from "https://deno.land/std@0.178.0/path/mod.ts";

import { DOMParser, HTMLTemplateElement } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
//https://deno.land/x/nunchuks@3.2.3-2/ ??
// import { transform as esbuildTransform } from "https://deno.land/x/esbuild@v0.17.8/mod.js";
// import { Language, minify } from "https://deno.land/x/minifier@v1.1.1/mod.ts";

// async function minifyJs(code: string) {
//     return minify(Language.JS, code);
// }

// function minifyJs(code: string) {
//     return code.replace(/\/\/.*\r?\n/g, "");

// }

const config = {
    ignorePrefix: "_",
    target: "docs",
};
const derived = {
    cwd: Deno.cwd(),
    exts: [
        ...["html", "txt", "js", "css", "less"],
        ...["jpg", "svg", "webp"],
    ],
    skip: [
        new RegExp(`^${config.target}`, "i"),
        /^_/,
        ///^tests/,
    ],
}

try {
    await Deno.remove(config.target, { recursive: true });
} catch {
    // Deno docs tell us to just rely on the exception, weird
}

try {
    await Deno.mkdir(config.target);
} catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) {
        throw err;
    }
}

const transformers = [
    class HtmlTransformer {
        static canTransform(entry: WalkEntry) {
            return entry.isFile && /\.html?$/.test(entry.name);
        }
        static async transform(entry: WalkEntry) {
            const target = join(config.target, entry.path);
            const html = await Deno.readTextFile(entry.path);

            const parser = new DOMParser();
            const document = parser.parseFromString(html, "text/html");

            let nodes = [document?.documentElement, document?.body];
            while (nodes.length > 0) {
                const [node] = nodes.splice(0, 1);
                nodes.push(...[...node?.childNodes]);

                if (/^script$/i.test(node?.tagName ?? "")) {
                    if (/_includes/i.test(node.getAttribute("src") ?? "")) {
                        node.parentNode?.removeChild(node);
                    }

                    if (node?.hasAttribute("src")) {
                        const adjustedSrc = node?.getAttribute("src")?.replace(/([^/]+)\.dev\.js$/, (all, base) => {
                            if (base) {
                                return `${base}.js`;
                            }
                            return all;
                        });
                        node.setAttribute("src", adjustedSrc);
                    }
                }

                if (/^include-/i.test(node?.tagName ?? "") && node?.hasAttribute("href")) {
                    const href = node?.getAttribute("href")!;
                    const text = Deno.readTextFileSync(`${derived.cwd}${href}`);
                    const tmpl = document?.createElement("template") as HTMLTemplateElement;
                    tmpl.innerHTML = text;
                    const fragment = tmpl.content;
                    node.parentNode?.replaceChild(fragment, node);
                }
            }

            const serialized = document?.documentElement?.outerHTML;
            if (!serialized) {
                throw new Error("Transform did produce no result");
            }

            await Deno.writeTextFile(target, [
                "<!DOCTYPE html>",
                serialized
            ].join("\n"));
        }
    },
    class ESTransformer {
        static canTransform(entry: WalkEntry) {
            return entry.isFile && /\.js$/.test(entry.name);
        }
        static async transform(entry: WalkEntry) {
            const target = join(config.target, entry.path);
            await copy(entry.path, target);

            if (/\.dev\.js$/.test(entry.name)) {
                const prodTarget = join(config.target, entry.path.replace(".dev.js", ".js"));

                // TODO: Transform JS files?
                // const text = await Deno.readTextFile(entry.path);
                // const min = minifyJs(text);
                // await Deno.writeTextFile(prodTarget, min);

                await copy(entry.path, prodTarget);
            }
        }
    }
];

async function process(entry: WalkEntry) {
    let hasBeenHandled = false;
    for await (const t of transformers) {
        if (t.canTransform(entry)) {
            hasBeenHandled = true;
            await t.transform(entry);
        }
    }
    if (!hasBeenHandled) {
        const target = join(config.target, entry.path);
        await copy(entry.path, target);
    }
}

// We don't want Jekyll to run here since the target directory is already built
const nojekyll = await Deno.open(join(config.target, ".nojekyll"), {
    createNew: true,
    write: true,
});
Deno.close(nojekyll.rid);

for await (const entry of walk(".", { skip: derived.skip, exts: derived.exts })) {
    if (entry.name.indexOf(config.ignorePrefix) === 0) {
        continue;
    }

    const dir = dirname(entry.path);
    try {
        await Deno.mkdir(join(config.target, dir), { recursive: true });
        await process(entry);
    } catch (err) {
        if (!(err instanceof Deno.errors.AlreadyExists)) {
            throw err;
        }
    }
}
