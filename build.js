/* eslint-env node */

const fs = require("fs");
const path = require("path");

// External libraries

const { contains, join, replace, toLower } = require("ramda");
const elmStaticHtml = require("elm-static-html-lib").default;

// Constants

const CWD = __dirname;
const DEBUG = true;
const ELM_PACKAGE_PATH = `${CWD}/`;
const SRC_DIR = `${CWD}/src`;
const OUTPUT_DIR = `${CWD}/private`;
const ARTICLE_DIR = `${CWD}/private/blog`;
const PAGE_TITLE = `A blog about life`;
const CODE_STYLE = `dracula`; // default, github, vs, vs2015

// Invariants

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdir(OUTPUT_DIR);
}

if (!fs.existsSync(ARTICLE_DIR)) {
    fs.mkdir(ARTICLE_DIR);
}

// Utilities

const pretty = x => JSON.stringify(x, null, `  `);
const trace = (...rest) => console.log(`> `, ...rest);
const fail = (...rest) => console.error(`> `, rest);

const joinCompact = join(``);

const generatePageMarkup = ({ title, body, styleRootDir }) => joinCompact([
    `<!DOCTYPE html>`,
    `<html lang="en" class="ui-layout">`,
    `<head>`,
        `<meta charset="utf-8">`,
        `<title>${title} - CANENA</title>`,
        `<meta http-equiv="X-UA-Compatible" content="IE=edge">`,
        //<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />-
        `<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0"/>`,
        `<link rel="stylesheet" type="text/css" href="${styleRootDir || ""}style/main.css?v1">`,
    `</head>`,
    `<body class="ui-theme ui-theme--canena">`,
    `${body}`,
    `<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/${CODE_STYLE}.min.css">`,
    `<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>`,
    `</body>`,
    `</html>`,
]);

const renderPage = ({ isToplevel, moduleName, modulePath, model, route, title }) => (
    elmStaticHtml(ELM_PACKAGE_PATH, `${moduleName}.view`, {
        decoder: `${moduleName}.decodeModel`,
        indent: 0,
        model,
    }).then(generatedHtml => {
        const filePathRaw = isToplevel
              ? `${OUTPUT_DIR}/index.html`
              : `${ARTICLE_DIR}/${route}/index.html`;

        const filePath = toLower(filePathRaw);
        const fileDir = path.dirname(filePath);

        if (!fs.existsSync(fileDir)) {
            trace(`creating directory "${fileDir}"...`)
            fs.mkdirSync(fileDir);
        }

        const prefix = DEBUG ? `<pre>${modulePath} -> ${filePath}</pre>` : ``;

        trace(`generating ${moduleName} at "${filePath}"...`);

        try {
            fs.writeFile(
                filePath,
                generatePageMarkup({
                    body: prefix + generatedHtml,
                    styleRootDir: isToplevel ? `../` : `../../../`,
                    title,
                }),
                `utf-8`
            );
            trace(`generated ${moduleName}.`);
        } catch (e) {
            fail(`Failed generating ${moduleName}.`);
            throw e;
        }
    })
);

const getModulePath = moduleName =>
    `${SRC_DIR}/${replace(`.`, `/`, moduleName)}.elm`;

const slugToUrl = slug => (
    slug.replace(/^([^_]+)_/, (m, root) => (
        `/${toLower(root)}/`
    )).replace(/_/g, `-`)
);

// FIXME: this regex fiddling should do for now but please, future me,
//        don't expand this further without involving a proper parser...
const readMeta = (moduleName, title, route) => (
    Promise.resolve(fs.readFileSync(
        getModulePath(moduleName), `utf-8`
    )).then(source => {
        //trace(`${moduleName}::src`, source);
        const result = {
            route,
            title,
        };
        source.replace(/meta\s+:\s+Meta/, (match, pos, rest) => {
            const tmp = rest.substring(pos);
            tmp.replace(/decodeModel : Decoder Model/, (m, pos2) => {
                const meta = tmp.substring(0, pos2);

                if (!result.title) {
                    meta.replace(/title\s+=\s+"([^"]+)"/, (_, title) => {
                        result.title = title;
                    });
                }

                if (!result.route) {
                    meta.replace(/route\s+=\s+Article\s+([\w_]+)/, (_, slug) => {
                        result.route = slugToUrl(slug);
                    });
                }
            });
        });
        return result;
    })
);

const dispatch = (moduleName, title = null, route = null) => (
    trace(`dispatching ${moduleName}`),
    readMeta(moduleName).then(meta => {
        const isToplevel = !contains(`.`, moduleName);

        if (title) {
            meta.title = title;
        }

        if (route) {
            meta.route = route;
        }

        if (!meta.title || !meta.route) {
            throw new Error(joinCompact([
                `Could not generate output for "${moduleName}".`,
                `Please check extracted meta ${pretty(meta)}.`
            ]));
        }
        return renderPage({
            isToplevel,
            model: { who: `World` }, // FIXME: who is model?
            moduleName,
            modulePath: getModulePath(moduleName),
            route: meta.route,
            title: `${meta.title} - ${PAGE_TITLE}`,
        });
    })
);

// Do it...

Promise.all([
    dispatch(`Home`, `Welcome to my blog`, `/`),
    dispatch(`Blog.About`),
    //renderPage({
    //    isToplevel: true,
    //    model: { who: `World` },
    //    moduleName: `Home`,
    //    modulePath: getModulePath(`Home`),
    //    title: PAGE_TITLE,
    //}),
    //renderPage({
    //    model: { who: "World" },
    //    moduleName: "Blog.About",
    //    title: PAGE_TITLE,
    //}),
    //renderPage({
    //    model: { who: "World" },
    //    moduleName: "Blog.EpicLinks",
    //    title: PAGE_TITLE,
    //}),
    //renderPage({
    //    model: { who: "World" },
    //    moduleName: "Blog.HelloLivingStyleguide",
    //    title: PAGE_TITLE,
    //}),
    //renderPage({
    //    model: { who: "World" },
    //    moduleName: "Blog.MakingAHabitOfMakingAHabit",
    //    title: PAGE_TITLE,
    //}),
]).catch(err => fail(err.message));
