import postcss from "postcss";
// noinspection TypeScriptCheckImport
import postcssJs from "postcss-js";
import autoprefixer from "autoprefixer";

export function promiseReverse(inputReactObjText) {
    return new Promise(resolve => resolve(JSON.parse(inputReactObjText)))
        .then(obj => postcss([autoprefixer])
            .process(obj, {parser: postcssJs, from: undefined})
        );
}