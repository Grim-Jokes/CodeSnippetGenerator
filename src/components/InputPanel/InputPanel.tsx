import * as React from 'react';

import { TextArea } from '../TextArea';

import styles from './InputPanel.module.css';

type Props = {
    onTextChange: (text: string) => void
    onSelection: (text: string) => void;
}

export function InputPanel(props: Props) {
    return <div className={styles.leftPanel}>
        <TextArea onChange={(value) => props.onTextChange(value)} 
        onSelection={props.onSelection}/>
    </div>
}