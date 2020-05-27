import * as React from 'react';

import styles from './Cell.module.css';

type Props = Readonly<{
    children: JSX.Element | JSX.Element[];
    className?: string;
}>;

export function Cell(props: Props) {
    return <div className={'cell ' + styles.cell + ' ' + props.className}>{props.children}</div>
}