import {shallow} from "enzyme";
import * as React from 'react';

import Input from "../Input";

describe("Input", function () {
    it("should shallow without error", function () {
        shallow(
            <Input
                value="someValue"
                placeholder="somePlaceholder"
                onChange={() => {
                }}
            />
        );
    });
});