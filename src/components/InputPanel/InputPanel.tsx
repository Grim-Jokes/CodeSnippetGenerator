import * as React from 'react';

import { TextArea } from '../TextArea';

import styles from './InputPanel.module.css';

type Props = {
    onTextChange: (text: string) => void;
    onSelection: (text: string) => void;
    value: string;
}

export function InputPanel(props: Props) {
    return <div className={styles.leftPanel}>
        <TextArea text={props.value} onChange={(value) => props.onTextChange(value)} 
        onSelection={props.onSelection}/>
    </div>
}