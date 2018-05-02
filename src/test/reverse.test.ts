import chai from 'chai';

import {promiseReverse} from '../reverse';

describe("reverse", function () {
    it("should reverse reactStyleObjText to css text", function () {
        // given
        const reactText = '{"body": {"marginLeft": "5%"}}';

        // when
        let promise = promiseReverse(reactText);

        // then
        const expectedCssText = "body {\n" +
            "    margin-left: 5%\n" +
            "}";

        return promise.then(resultCssText => chai.expect(resultCssText.css).to.equal(expectedCssText));
    });

    it("should be able to convert non-standard but parsable json object", function () {
        // given
        const reactText = '{"not valid": {"not recognizable": "some garbage"}}';

        // when
        let promise = promiseReverse(reactText);

        // then
        const stillCanTranslateToCssText = "not valid {\n    not recognizable: some garbage\n}";

        return promise.then(resultCssText => chai.expect(resultCssText.css).to.equal(stillCanTranslateToCssText));
    });

    it("should for non-parsable json object", function () {
        // given
        const reactText = "some random non-parsable text";

        // when
        let promise = promiseReverse(reactText);

        // then
        const expectedErrorMessage = "Unexpected token s in JSON at position 0";

        return promise.catch(error =>
            chai.expect(error)
                .to.be.an('error')
                .with.property('message', expectedErrorMessage)
        );
    });
});
