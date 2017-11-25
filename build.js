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
const PAGE_TITLE = `A blog about life`;

// Invariants

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdir(OUTPUT_DIR);
}

// Utilities

const joinCompact = join("");

const generatePage = ({ title, body, styleRootDir }) => joinCompact([
    `<!DOCTYPE html>`,
    `<html lang="en" class="ui-layout">`,
    `<head>`,
        `<meta charset="utf-8">`,
        `<title>${title}</title>`,
        `<meta http-equiv="X-UA-Compatible" content="IE=edge">`,
        //<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />-
        `<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0"/>`,
        `<link rel="stylesheet" type="text/css" href="${styleRootDir || ""}style/main.css?v1">`,
    `</head>`,
    `<body class="ui-theme ui-theme--canena">${body}</body>`,
    `</html>`,
]);

// Do it...

const model = { who: "World" };
const options = {
    decoder: "Index.decodeModel",
    indent: 0,
    model : model,
};

elmStaticHtml(ELM_PACKAGE_PATH, "Index.view", options)
    .then(generatedHtml => (
        fs.writeFile(`${OUTPUT_DIR}/index.html`, generatePage({
            body: generatedHtml,
            styleRootDir: `../`,
            title: PAGE_TITLE,
        }))
    ));
