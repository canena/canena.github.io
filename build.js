/* eslint-env node */

const fs = require("fs");
const path = require("path");

// External libraries

const { join } = require("ramda");
const elmStaticHtml = require("elm-static-html-lib").default;

// Constants

const CWD = __dirname;
const ELM_PACKAGE_PATH = `${CWD}/`;
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

const joinCompact = join("");

const generatePageMarkup = ({ title, body, styleRootDir }) => joinCompact([
    `<!DOCTYPE html>`,
    `<html lang="en" class="ui-layout">`,
    `<head>`,
        `<meta charset="utf-8">`,
        `<title>${title} - CANENA Blog</title>`,
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

const renderPage = ({ isToplevel, moduleName, model, title }) => (
    elmStaticHtml(ELM_PACKAGE_PATH, `${moduleName}.view`, {
        decoder: `${moduleName}.decodeModel`,
        indent: 0,
        model,
    }).then(generatedHtml => (
        fs.writeFile(
            isToplevel
                ? `${OUTPUT_DIR}/index.html`
                : `${ARTICLE_DIR}/index.html`,
            generatePageMarkup({
                body: generatedHtml,
                styleRootDir: isToplevel ? `../` : `../../`,
                title,
            }),
        "utf-8")
    ))
);

// Do it...

Promise.all([
    renderPage({
        isToplevel: true,
        model: { who: "World" },
        moduleName: "Home",
        title: PAGE_TITLE,
    }),
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
]).catch(err => console.error(err));
