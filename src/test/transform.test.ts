import {transform} from '../transform';

describe("transform", function () {
    it("should reverse reactStyleObjText to css text", function () {
        // given
        const cssText = `body {margin-left: 5%}`, reactObject = {"body": {"marginLeft": "5%"}};

        // when
        let result = transform(cssText);

        // then
        expect(result).toEqual(reactObject);
    });

    it("should throw Error for non-parsable json object", function () {
        // given
        const reactText = "some random non-parsable text";

        // when
        let failedTransformation = () => transform(reactText);

        // then
        expect(failedTransformation).toThrow();
    });
});
