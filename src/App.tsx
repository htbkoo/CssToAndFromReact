import React from 'react';

import StyledTextArea from "./StyledTextArea";
import {transform} from './transform';
import {promiseReverse} from "./reverse";

import "./stylesheets/App.css";

const initialStarterText = "";

type AppProps = {};
type AppState = {
    inputText: string,
    outputText: string,
    error?: string,
    reverseError?: string,
    shouldFormat: boolean
};

export default class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.inputTextUpdate = this.inputTextUpdate.bind(this);
        this.outputTextUpdate = this.outputTextUpdate.bind(this);

        this.state = {
            inputText: initialStarterText,
            outputText: initialStarterText,
            shouldFormat: false
        }
    }

    componentDidMount() {
        // TODO: remove me...
        this.update();
    }

    inputTextUpdate(e) {
        this.setState({
            inputText: e.target.value
        }, () => {
            this.update();
        });
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
                <br/>
                <input
                    className="checkbox-format"
                    checked={this.state.shouldFormat}
                    type="checkbox"
                    onChange={e => this.update(e.target.checked)}
                /> Format
            </div>
        );
    }
}
