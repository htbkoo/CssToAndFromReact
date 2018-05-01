import postcss from "postcss";
// noinspection TypeScriptCheckImport
import postcssJs from "postcss-js";
import autoprefixer from "autoprefixer";

export function promiseReverse(inputReactObjText) {
    return postcss([autoprefixer])
        .process(JSON.parse(inputReactObjText), {parser: postcssJs, from: undefined});
}