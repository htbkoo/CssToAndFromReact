var css = require("css");
// var reactCSS = require('reactcss');
var reactCSS = require('reactcss').default;

describe("transform", function () {
    it("spec name", function () {
        var reactText = JSON.stringify({"a": {"color": "red"}});

        // let parsed = JSON.parse(reactText);
        var result = reactCSS({'default': JSON.parse(reactText)});

        console.log(JSON.stringify(result));
    });

    xit("spec nam e", function () {
        // var ast = css.parse('body { font-size: 12px; }', { source: 'source.css' });
        var ast = css.parse('body { font-size: 12px; }');

        // var css = css.stringify(ast);

        var result = css.stringify(ast, {sourcemap: true});
    });

    xit("should try css parser", function () {
        var obj = css.parse("body {margin-right: #FFFFF;}");
        console.log(css.stringify("{\"body\":{\"marginRight\":\"#FFFFF\"}}"));
    });
});

