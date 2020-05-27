import * as React from 'react';

import styles from './ConfigPanel.module.css';
import { Row } from '../Row';
import { Cell } from '../Cell';

type Props = {
    selection?: string
    close?: () => void
}

export function ConfigPanel(props: Props) {
    if (!props.selection) {
        return <Row className={styles.configPanel}>
            <Cell>
                <div>
                    Select some text to choose what to replace it with
                </div>
            </Cell>
        </Row>;
    }
    return <>
        <Row className={styles.configPanel}>
            <Cell>
                <div><span>Replace </span><span className={styles.selection}>{props.selection} </span>with:</div>
            </Cell>
        </Row>
        <Row>
            <Cell>
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>Placeholders</div>
                    <div className={styles.button}>Tabtop</div>
                    <div className={styles.button}>Choice</div>
                    <div className={styles.button}>Variables</div>
                </div>
            </Cell>
        </Row>
    </>
}