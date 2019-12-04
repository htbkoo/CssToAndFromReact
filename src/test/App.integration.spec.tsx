/**
 * @jest-environment jsdom
 */

import {mount} from "enzyme";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from '../App';

describe("App (integration test)", function () {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should mount without error", function () {
        mount(<App/>);
    });
});