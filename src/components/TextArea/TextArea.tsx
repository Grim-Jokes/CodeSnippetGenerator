import * as React from 'react';

import './style.css';
import styles from './TextArea.module.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import { Controlled as CodeMirror, EditorChangeEvent } from 'react-codemirror2';
import { Editor, Position, EditorConfiguration } from 'codemirror';

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

type Data = {
    origin: "*mouse" | "+move" | "-move" | void,
    ranges: { anchor: Position, head: Position }[],
}

export class TextArea extends React.PureComponent<Props, State> {
    state: State = { value: '' }
    editor?: Editor;
    doubleClicked = false;

    onEditorMounted = (editor: Editor) => {
        editor.setSize('', '100%');

        const start: Position = {
            ch: 19,
            line: 0
        };
        const end: Position = {
            ch: 18,
            line: 0
        };
    }

    render() {
        return <CodeMirror
            onBeforeChange={this.onChange}
            editorDidMount={this.onEditorMounted}
            className={styles.codeMirror}
            onDblClick={this.onDbClick}
            onSelection={this.onSelection}
            onDragStart={this.onDragStart}
            options={{
                onDragEvent: this.onDragEvent,
                autofocus: true,
                readOnly: false,
                theme: "dracula",
                lineNumbers: true,
            }}
            value={this.props.text || ''} />
    }

    private onDragEvent = (editor: Editor, event: DragEvent) => {
        console.log(event);
        return false;
    }

    private onChange = (editor: Editor, data: any, value: any) => {
        this.setState({ value }, () => {
            this.props.onChange(value)
        });
    }

    private onDbClick = (editor: Editor, data: Data) => {
        const text = (editor.getDoc().getSelection());
        if (text) {
            this.props.onSelection(text);
            this.doubleClicked = true;
        }
    }

    private onDragStart = (editor: Editor, data: Data) => {
        console.log(data);
    }

    private onSelection = (editor: Editor, data: Data) => {
        if (this.doubleClicked) {
            this.doubleClicked = false;
            return;
        }
        const start = editor.getCursor("from");
        const end = editor.getCursor("to");

        console.log(start.ch, end.ch);

        const text = editor.getRange(start, end);
        if (text) {
            this.props.onSelection(text);
        }
    }
}