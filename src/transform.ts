import cssParser, { Declaration, Media, Rule, StyleRules } from "css";

type HasBootstrapWithCssClass = {
  bootstrapWithCssClass: any;
};

//
// Transform implementation or originally thanks to
// https://github.com/raphamorim/native-css
//

type Rules = StyleRules["rules"];
type DeclarationOrComment = Rule["declarations"][number];

const isMediaRule = (rule): rule is Media => rule.type === "media";
const isRule = (rule): rule is Rule => rule.type === "rule";
const isDeclaration = (declaration: DeclarationOrComment): declaration is Declaration =>
  declaration.type === "declaration";

function transformRules(self, rules: Rules, result) {
  rules.forEach(function (rule) {
    var obj = {};
    if (isMediaRule(rule)) {
      var name = mediaNameGenerator(rule.media);
      var media = (result[name] = result[name] || {
        __expression__: rule.media,
      });
      transformRules(self, rule.rules, media);
    } else if (isRule(rule)) {
      rule.declarations.forEach(function (declaration) {
        if (isDeclaration(declaration)) {
          var cleanProperty = cleanPropertyName(declaration.property);
          obj[cleanProperty] = declaration.value;
        }
      });
      rule.selectors.forEach(function (selector) {
        var name = nameGenerator(selector.trim());
        result[name] = obj;
      });
    }
  });
}

var cleanPropertyName = function (name) {
  // turn things like 'align-items' into 'alignItems'
  name = name.replace(/(-.)/g, function (v) {
    return v[1].toUpperCase();
  });

  return name;
};

var mediaNameGenerator = function (name) {
  return "@media " + name;
};

var nameGenerator = function (name) {
  name = name.replace(/\s\s+/g, " ");
  name = name.replace(/[^a-zA-Z0-9]/g, "_");
  name = name.replace(/^_+/g, "");
  name = name.replace(/_+$/g, "");

  return name;
};

export function transform(inputCssText: string) {
  if (!inputCssText) {
    throw new Error("missing css text to transform");
  }

  // If the input "css" doesn't wrap it with a css class (raw styles)
  // we need to wrap it with a style so the css parser doesn't choke.
  var bootstrapWithCssClass = false;
  if (inputCssText.indexOf("{") === -1) {
    bootstrapWithCssClass = true;
    inputCssText = `.bootstrapWithCssClass { ${inputCssText} }`;
  }

  var css = cssParser.parse(inputCssText);
  var result = {};
  transformRules(this, css.stylesheet.rules, result);

  // Don't expose the implementation detail of our wrapped css class.
  if (bootstrapWithCssClass) {
    result = (result as HasBootstrapWithCssClass).bootstrapWithCssClass;
  }

  return result;
}
