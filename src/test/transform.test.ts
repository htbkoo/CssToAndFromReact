import {transform} from '../transform';

describe("transform", function () {
    [
        {
            cssText: `body {margin-left: 5%}`,
            reactObject: {"body": {"marginLeft": "5%"}}
        }
    ].forEach(({cssText, reactObject}) =>
        it(`should transform css text (${cssText}) to reactStyleObj(${JSON.stringify(reactObject)})`, function () {
            // given
            // when
            let result = transform(cssText);

            // then
            expect(result).toEqual(reactObject);
        })
    );

    it("should throw Error for non-parsable text", function () {
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
