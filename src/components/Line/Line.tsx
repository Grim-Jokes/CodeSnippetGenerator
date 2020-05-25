import * as React from 'react';

import styles from './Line.module.css';
import { getParser, Scannable } from '../../services/parser';
import { Space } from '../Space';
 
type Props = Readonly<{
    children: string
    length: number,
    index: number
}>;


type OffsetLineProps = {
    comma: boolean,
    children: string | JSX.Element | JSX.Element[]
}
function OffsetLine(props: OffsetLineProps) {
    const comma: string = (props.comma) ? ',' : '';
    return <div>
        <Space>
            <Space>
                {props.children}"{comma}
            </Space>
        </Space>
    </div>
}

export function Line(props: Props) {
    const parser: Scannable = getParser();
    
    const tokens = parser.findTokens(props.children);

    if (tokens.length === 0) {
        return <OffsetLine comma={props.index + 1 !== props.length}><span>{props.children}</span></OffsetLine>
    }

    const result: JSX.Element[] = [];

    for (let i = 0; i < tokens.length; i++) {            
        const token = tokens[i];

        if (token.highlight) {
            result.push(<span key={i} className={styles.token}>{token.token}</span>);
        } else {
            result.push(<span key={i}>{token.token}</span>)
        }     
    }

    return (
        <OffsetLine comma={props.index + 1 !== props.length}>
            {result}
        </OffsetLine>
    );
}