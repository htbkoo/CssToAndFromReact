import {shallow} from "enzyme";
import * as React from 'react';

import StyledTextArea from "../StyledTextArea";

import {NO_OP} from "../utils/utils";

describe("StyledTextArea", function () {
    it("should shallow without error and contain a <textarea/>", function () {
        // given
        let wrapper = shallow(
            <StyledTextArea
                value="someValue"
                placeholder="somePlaceholder"
                onChange={NO_OP}
            />
        );

        // when
        let textarea = wrapper.find("textarea");

        // then
        expect(textarea.length).toEqual(1);
        expect(textarea.hasClass("textarea-error")).toEqual(false);
    });

    [
        true,
        false
    ].forEach(isError =>
        it(`should contain a <textarea/> and contain class .textarea-error according to props.isError=${isError}`, function () {
            // given
            // when
            let wrapper = shallow(
                <StyledTextArea
                    value="someValue"
                    placeholder="somePlaceholder"
                    onChange={NO_OP}
                    isError={isError}
                />
            );

            // then
            expect(wrapper.find("textarea").hasClass("textarea-error")).toEqual(isError);
        })
    );
});