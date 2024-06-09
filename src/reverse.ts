import { default as postcss }  from "postcss";
// noinspection TypeScriptCheckImport
import postcssJs from "postcss-js";
import autoprefixer from "autoprefixer";

export function promiseReverse(inputReactObjText: string) {
    return promiseParseJson(inputReactObjText)
        .then(obj => postcss([autoprefixer])
            .process(obj, {parser: postcssJs, from: undefined})
        );
}

function promiseParseJson(inputReactObjText: string) {
    return new Promise(resolve => resolve(JSON.parse(inputReactObjText)));
}
