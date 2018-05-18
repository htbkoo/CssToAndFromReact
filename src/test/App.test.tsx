import {shallow} from "enzyme";
import * as React from 'react';
import {sinonTest} from './utils/sinonWithTest'

import App from '../App';
import StyledTextArea from "../StyledTextArea";
import * as transform from '../transform';

describe("App", function () {
    describe("construction", function () {
        it("should have 2 <StyledTextArea/> and 1 <input/> when rendered", function () {
            // given
            // when
            let wrapper = shallow(<App/>);

            // then
            expect(wrapper.find(StyledTextArea).length).toEqual(2);
            expect(wrapper.find("input").length).toEqual(1);
        });
    });

    describe("forward transformation", function () {
        it("should, on input valid change, update output", sinonTest(function () {
            // given
            const input = "someInput", result = {"key": "value"};
            this.stub(transform, "transform").withArgs(input).returns(result);

            let wrapper = shallow(<App/>);

            // when
            let inputTextArea = wrapper.find(StyledTextArea).at(0);
            inputTextArea.simulate("change", {target: {value: input}});

            // then
            expect(wrapper.state("inputText")).toEqual(input);
            const expectedOutput = JSON.stringify(result);
            expect(wrapper.state("outputText")).toEqual(expectedOutput);
        }));
    });
});