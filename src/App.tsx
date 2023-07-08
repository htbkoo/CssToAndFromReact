import React from 'react';

import "./stylesheets/App.css";

import StyledTextArea from "./StyledTextArea";
import { transform } from './transform';
import { promiseReverse } from "./reverse";
import GoogleAnalyticsManager from "./services/GoogleAnalyticsManager";

const initialStarterText = "";

type AppProps = {};
type AppState = {
    inputText: string,
    outputText: string,
    shouldFormat: boolean,
    error?: string,
    reverseError?: string
};

enum GA_TRACKING_EVENT_NAMES {
    TRANSLATION = "css_to_and_from_react__Translation",
}

enum GA_TRACKING_EVENT_PARAMS_TRANSLATION_ACTIONS {
    TO_CSS = "To CSS",
    FROM_CSS = "From CSS",
}

export default class App extends React.Component<AppProps, AppState> {
    private readonly gAManager: GoogleAnalyticsManager = new GoogleAnalyticsManager();

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.inputTextUpdate = this.inputTextUpdate.bind(this);
        this.outputTextUpdate = this.outputTextUpdate.bind(this);

        this.state = {
            inputText: initialStarterText,
            outputText: initialStarterText,
            shouldFormat: false
        };
    }

    inputTextUpdate(e) {
        this.setState({
            inputText: e.target.value
        }, this.update);
    }

    outputTextUpdate(e) {
        this.setState({
            outputText: e.target.value
        }, () => {
            let outputText = this.state.outputText;
            if (outputText === initialStarterText) {
                this.setState({
                    outputText: initialStarterText,
                    reverseError: null
                });
                return;
            }

            return promiseReverse(outputText)
                .then(result => {
                    this.trackTranslation(GA_TRACKING_EVENT_PARAMS_TRANSLATION_ACTIONS.TO_CSS);

                    this.setState({
                        inputText: result.css,
                        reverseError: null
                    })
                })
                .catch(error => {
                    this.setState({
                        reverseError: error
                    })
                });
        });
    }

    update(shouldFormat = this.state.shouldFormat) {

        console.log('update', arguments);

        if (this.state.inputText === initialStarterText) {
            this.setState({
                inputText: initialStarterText,
                error: null
            });
            return;
        }

        try {
            let transformed = transform(this.state.inputText);

            let result = JSON.stringify(transformed, null, shouldFormat ? 2 : 0);

            this.trackTranslation(GA_TRACKING_EVENT_PARAMS_TRANSLATION_ACTIONS.FROM_CSS);

            this.setState({
                outputText: result,
                error: null,
                shouldFormat
            });
        } catch (ex) {
            this.setState({
                error: ex
            });
        }
    }

    render() {
        console.log('state', this.state);
        let inputText = this.state.reverseError || this.state.inputText;
        let outputText = this.state.error || this.state.outputText;

        return (
            <div className="App-Container">
                <StyledTextArea
                    placeholder="Type or paste CSS here..."
                    onChange={this.inputTextUpdate}
                    value={inputText}
                    isError={!!this.state.reverseError}
                />
                <StyledTextArea
                    placeholder="Type or paste React in-line style object here..."
                    onChange={this.outputTextUpdate}
                    value={outputText}
                    isError={!!this.state.error}
                />
                <br />
                <input
                    id="checkbox-format"
                    className="checkbox-format"
                    checked={this.state.shouldFormat}
                    type="checkbox"
                    onChange={e => this.update(e.target.checked)}
                />
                <label htmlFor="checkbox-format">Format</label>
            </div>
        );
    }

    private trackTranslation(action: GA_TRACKING_EVENT_PARAMS_TRANSLATION_ACTIONS) {
        this.gAManager.event(GA_TRACKING_EVENT_NAMES.TRANSLATION, {
            action,
        });
    }
}
