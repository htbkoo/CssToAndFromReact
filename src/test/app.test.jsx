import {mount} from "enzyme";
import React from 'react';

import App from '../App';

describe("App", function () {
    it("should render without error", function () {
        mount(<App/>);
    });
});