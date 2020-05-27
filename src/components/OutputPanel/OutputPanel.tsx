import * as React from 'react';

import { Line } from '../Line';
import { Space } from '../Space';

import styles from './OutputPanel.module.css';

type Props = {
    text: string
    prefix?: string;
    selection?: string;
}

function toLine(entry: string, index: number, entries: string[]) {
    return (
        <Line key={index} index={index} length={entries.length}>{entry}</Line>
    );
}


export function OutputPanel(props: Props) {
    let bodyLines: string[] = [];
    let prefixes: string[] = [];

    if (props.text) {
        bodyLines = props.text.split('\n');
    }

    if (props.prefix) {
        prefixes = props.prefix.split(',');
    }

    return (<>
        <div className={styles.outputPanel}>
            <pre>
                <code>
                    <br />
                    <Space>
                        "prefix":
                    </Space>
                    {` "${JSON.stringify(prefixes) || ''}"` + ','}
                    <br />
                    <Space>
                        "body": [
                    </Space>
                    {bodyLines.map(toLine)}
                    <Space>
                        ],
                    </Space>
                    <br />
                    <Space>
                        "description": ""
                    </Space>
                    <br />
                </code>
            </pre>
        </div>
    </>);
}