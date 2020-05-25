import * as React from 'react';

import styles from './Cell.module.css';

type Props = Readonly<{
    children: JSX.Element
}>;

export function Cell(props: Props) {
    return <div className={'cell ' + styles.cell}>{props.children}</div>
}