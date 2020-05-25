import * as React from 'react';

import './style.css';
import styles from './TextArea.module.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import { default as CM } from 'react-codemirror2';
import { Controlled as CodeMirror, EditorChangeEvent } from 'react-codemirror2';
import { Editor } from 'codemirror';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

type Props = {
    cssClass?: string
    text?: string;
    onChange: (value: string) => void;
    onSelection: (value: string) => void;
}

type State = {
    value: string;
}

type Point = {
    ch: number,
    line: number,
    sticky?: number

}

type Data = {
    origin: "*mouse" | "+move"  | "-move" | void,
    ranges: { anchor: Point, head: Point }[],
}

export class TextArea extends React.PureComponent<Props, State> {
    state: State = { value: '' }
    editor?: Editor;
    
    onEditorMounted = (editor: Editor)  => {
        editor.setSize('', '100%');
        editor.focus();
    }

    render() {
        return <CodeMirror
            onBeforeChange={this.onChange}
            editorDidMount={this.onEditorMounted}
            onSelection={this.onSelection}
            className={styles.codeMirror}
            options={{
                readOnly: false,
                mode: "javascript",
                theme: "dracula",
                lineNumbers: true,
            }}
            value={this.state.value} />
    }

    private onChange = (editor: Editor, data: any, value: any) => {
        this.setState({ value }, () => {
            this.props.onChange(value)
        });
    }

    private onSelection = (editor: Editor, data: Data) => {
        this.props.onSelection(editor.getDoc().getSelection());
    }
}