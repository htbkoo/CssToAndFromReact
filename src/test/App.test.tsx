import {shallow} from "enzyme";
import * as React from 'react';

import App from '../App';

describe("App", function () {
    it("should shallow without error", function () {
        shallow(<App/>);
    });
});