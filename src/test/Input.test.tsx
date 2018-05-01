import {shallow} from "enzyme";
import * as React from 'react';

import Input from "../Input";

import {NO_OP} from "../utils/utils";

describe("Input", function () {
    it("should shallow without error", function () {
        shallow(
            <Input
                value="someValue"
                placeholder="somePlaceholder"
                onChange={NO_OP}
            />
        );
    });
});