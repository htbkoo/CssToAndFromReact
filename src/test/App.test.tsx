import {shallow} from "enzyme";
import * as React from 'react';

import App from '../App';
import StyledTextArea from "../StyledTextArea";

describe("App", function () {
    it("should have 2 <StyledTextArea/> and 1 <input/> when rendered", function () {
        // given
        // when
        let wrapper = shallow(<App/>);

        // then
        expect(wrapper.find(StyledTextArea).length).toEqual(2);
        expect(wrapper.find("input").length).toEqual(1);
    });
});