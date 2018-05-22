import {shallow} from "enzyme";
import * as React from 'react';
import {sinonTest} from './utils/sinonWithTest'

import App from '../App';
import StyledTextArea from "../StyledTextArea";
import * as transform from '../transform';
import {CSS_VALUE} from "../__mocks__/reverse";

jest.mock('../reverse');

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
            let inputTextArea = inputFrom(wrapper);
            inputTextArea.simulate("change", mockEvent(input));

            // then
            assertInput(wrapper, input);
            const expectedOutput = JSON.stringify(result);
            expect(wrapper.state("outputText")).toEqual(expectedOutput);
        }));

        it("should, on input invalid change, update output", sinonTest(function () {
            // given
            const input = "someInput", someError = new Error("some error");
            this.stub(transform, "transform").withArgs(input).throws(someError);

            let wrapper = shallow(<App/>);

            // when
            let inputTextArea = inputFrom(wrapper);
            inputTextArea.simulate("change", mockEvent(input));

            // then
            assertInput(wrapper, input);
            expect(wrapper.state("error")).toEqual(someError);
        }));

        it("should, on empty input, reset error", sinonTest(function () {
            // given
            const emptyInput = "";

            let wrapper = shallow(<App/>);
            wrapper.setState({"error": new Error("some error")});

            // when
            let inputTextArea = inputFrom(wrapper);
            inputTextArea.simulate("change", mockEvent(emptyInput));

            // then
            assertInput(wrapper, emptyInput);
            expect(wrapper.state("error")).toBe(null);
        }));

        function inputFrom(wrapper) {
            return wrapper.find(StyledTextArea).at(0);
        }

        function assertInput(wrapper, input: string) {
            expect(wrapper.state("inputText")).toEqual(input);
        }
    });

    describe("reverse transformation", function () {
        it("should, on output valid change, update input", function (done) {
            // given
            const output = "someOutput";
            let wrapper = shallow(<App/>);

            // when
            let outputTextArea = wrapper.find(StyledTextArea).at(1);
            outputTextArea.simulate("change", mockEvent(output));

            // then
            setImmediate(() => {
                expect(wrapper.state("outputText")).toEqual(output);
                expect(wrapper.state("inputText")).toEqual(CSS_VALUE);
                done();
            });
        });

        it("should, on empty output, reset reverseError", function () {
            // given
            const emptyOutput = "", someError = new Error("some error");
            let wrapper = shallow(<App/>);
            wrapper.setState({reverseError: someError});

            // when
            let outputTextArea = wrapper.find(StyledTextArea).at(1);
            outputTextArea.simulate("change", mockEvent(emptyOutput));

            // then
            expect(wrapper.state("outputText")).toEqual(emptyOutput);
            expect(wrapper.state("reverseError")).toEqual(null);
        });
    });

    function mockEvent(input: string) {
        return {target: {value: input}};
    }
});