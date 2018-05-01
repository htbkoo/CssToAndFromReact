import chai from 'chai';

import {promiseReverse} from '../reverse';

describe("reverse", function () {
    it("should reverse reactStyleObjText to css text", function () {
        // given
        const reactText = JSON.stringify({"body": {"marginLeft": "5%"}});

        // when
        let promise = promiseReverse(reactText);

        // then
        const expectedCssText = "body {\n" +
            "    margin-left: 5%\n" +
            "}";

        return promise.then(resultCssText => chai.expect(resultCssText.css).to.equal(expectedCssText));
    });

    it("should do what if input is garbage?", function () {
        // given
        const reactText = JSON.stringify({"not valid": {"not recognizable": "some garbage"}});

        // when
        let promise = promiseReverse(reactText);

        // then
        const stillCanTranslateToCssText = "not valid {\n    not recognizable: some garbage\n}";

        return promise.then(resultCssText => chai.expect(resultCssText.css).to.equal(stillCanTranslateToCssText));
    });
});
