import {shallow} from "enzyme";
import * as React from 'react';

import StyledTextArea from "../StyledTextArea";

import {NO_OP} from "../utils/utils";

describe("StyledTextArea", function () {
    it("should shallow without error", function () {
        shallow(
            <StyledTextArea
                value="someValue"
                placeholder="somePlaceholder"
                onChange={NO_OP}
            />
        );
    });
});