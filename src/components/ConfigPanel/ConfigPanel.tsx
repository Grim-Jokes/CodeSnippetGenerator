import * as React from 'react';

import styles from './ConfigPanel.module.css';
import { Row } from '../Row';
import { Cell } from '../Cell';
import { TabStopOption } from '../../types';

type Props = {
    selection?: string
    onClick: (option: TabStopOption) => void;
}

function createTabStopOnClick(option: TabStopOption, props: Props) {
    return () => {
        props.onClick(option);
    }
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
                    <div onClick={createTabStopOnClick(TabStopOption.Placeholder, props)} className={styles.button}>Placeholders</div>
                    <div onClick={createTabStopOnClick(TabStopOption.Tabstop, props)} className={styles.button}>Tabtop</div>
                    <div className={styles.button}>Choice</div>
                    <div className={styles.button}>Variables</div>
                </div>
            </Cell>
        </Row>
    </>
}