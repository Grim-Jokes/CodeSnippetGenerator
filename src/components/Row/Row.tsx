import * as React from 'react';

import styles from './Row.module.css';

type Props = {
    children: React.ReactElement | React.ReactElement[];
    className?: string;
}

export function Row(props: Props) {
    return (
        <div className={'row ' + props.className + ' ' + styles.row + ' ' + styles.content}>
            {props.children}
        </div>
    );
}