import {shallow} from "enzyme";
import * as React from 'react';

import StyledTextArea from "../StyledTextArea";

import {NO_OP} from "../utils/utils";

describe("StyledTextArea", function () {
    it("should shallow without error and contain a <textarea>", function () {
        // given
        // when
        let wrapper = shallow(
            <StyledTextArea
                value="someValue"
                placeholder="somePlaceholder"
                onChange={NO_OP}
            />
        );

        // then
        expect(wrapper.find("textarea").length).toEqual(1);
    });
});