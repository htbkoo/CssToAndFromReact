import React, {CSSProperties} from 'react';
import ReactDOM from 'react-dom';

type StyledTextAreaProps = {
    value: string,
    placeholder: string,
    onChange: (event) => void,
    style?: CSSProperties,
    isError?: boolean
};
type StyledTextAreaState = {};

const TEXTAREA_ERROR_CLASS = "textarea-error";

export default class StyledTextArea extends React.Component<StyledTextAreaProps, StyledTextAreaState> {
    static defaultProps: Partial<StyledTextAreaProps> = {
        isError: false
    };

    componentDidUpdate(prevProps) {
        let node = ReactDOM.findDOMNode(this) as HTMLInputElement; // reference: https://github.com/Microsoft/TypeScript/issues/10453#issuecomment-301263769
        let oldLength = node.value.length;
        let oldIdx = node.selectionStart;
        node.value = this.props.value;
        let newIdx = Math.max(0, node.value.length - oldLength + oldIdx);
        node.selectionStart = node.selectionEnd = newIdx;
    }

    render() {
        let className = this.props.isError ? TEXTAREA_ERROR_CLASS : "";
        return <textarea cols={40} rows={20} {...this.props} value={undefined} className={className}/>;
    }
}