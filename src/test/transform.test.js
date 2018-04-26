import chai from 'chai';

import {reverse} from '../transform';

describe("transform", function () {
    describe("reverse", function () {
        it("should reverse reactStyleObjText to css text", function () {
            // given
            const reactText = JSON.stringify({"body": {"marginLeft": "5%"}});

            // when
            let resultCssText = reverse(reactText);

            // then
            const expectedCssText = "body {\n" +
                " margin-left: 5%;\n" +
                "}";
            chai.expect(resultCssText).to.equal(expectedCssText);
        });
    });
});