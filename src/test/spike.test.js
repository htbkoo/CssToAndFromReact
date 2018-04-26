let css = require("css");
// let reactCSS = require('reactcss');
let reactCSS = require('reactcss').default;


const postcss = require('postcss');
const postcssJs = require('postcss-js');
const precss = require('precss');
const autoprefixer = require('autoprefixer');


describe("transform", function () {
    it("postcss", function () {
        // let reactText = JSON.stringify({"body": {"color": "red"}});
        // let reactText = JSON.stringify({"marginLeft": "5%"});
        let reactText = JSON.stringify({"body": {"marginLeft": "5%"}});

        // postcss()
        postcss([precss, autoprefixer])
            .process(JSON.parse(reactText), {parser: postcssJs, from: undefined})
            .then((result) => {
                console.log(JSON.stringify(result.css));

                // result.css //=> top: 10px;
                //   &:hover { top: 5px; }
            });
    });

    xit("reactCss", function () {
        let reactText = JSON.stringify({"a": {"color": "red"}});

        // let parsed = JSON.parse(reactText);
        let result = reactCSS({'default': JSON.parse(reactText)});

        console.log(JSON.stringify(result));
    });

    xit("spec nam e", function () {
        // let ast = css.parse('body { font-size: 12px; }', { source: 'source.css' });
        let ast = css.parse('body { font-size: 12px; }');

        // let css = css.stringify(ast);

        let result = css.stringify(ast, {sourcemap: true});
        console.log(result);
    });

    xit("should try css parser", function () {
        let obj = css.parse("body {margin-right: #FFFFF;}");
        console.log(css.stringify("{\"body\":{\"marginRight\":\"#FFFFF\"}}"));
        console.log(obj);
    });
});

