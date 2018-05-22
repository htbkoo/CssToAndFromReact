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
        const invalidText = "some random non-parsable text";

        // when
        let failedTransformation = () => transform(invalidText);

        // then
        expect(failedTransformation).toThrow();
    });

    it("should throw Error for empty input", function () {
        // given
        const emptyInput = "";

        // when
        let failedTransformation = () => transform(emptyInput);

        // then
        expect(failedTransformation).toThrow('missing css text to transform');
    });
});
