import React from 'react';

import Input from "./Input";
import {transform} from './transform';

var initialStarterText = "";

type AppProps = {};
type AppState = {
    inputText: string,
    outputText: string,
    error?: string,
    shouldFormat: boolean
};

export default class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.inputTextUpdate = this.inputTextUpdate.bind(this);

        this.state = {
            inputText: initialStarterText,
            outputText: "",
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
            var transformed = transform(this.state.inputText);

            var result = JSON.stringify(transformed, null, shouldFormat ? 2 : 0);
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
        var outputCssStyle = this.state.error ? {
            "backgroundColor": "lightcoral"
        } : null;
        console.log('state', this.state);
        var inputText = this.state.inputText;
        var outputText = this.state.error || this.state.outputText;

        return (
            <div style={{"textAlign": "center"}}>
                <Input ref='inputCss' placeholder="Type or paste CSS here..." onChange={this.inputTextUpdate}
                       value={inputText}/>
                <textarea ref='outputCss' cols={40} rows={20} style={outputCssStyle} value={outputText}/>
                <br/>
                <input style={{"marginLeft": "266px"}} ref="useNewline" checked={this.state.shouldFormat}
                       type="checkbox" onChange={e => this.update(e.target.checked)}/> Format
            </div>
        );
    }
}
