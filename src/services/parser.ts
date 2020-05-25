export type Token = {
    start: number,
    end: number,
    token: string,
    highlight?: boolean,
}

const START = '$';
const BODY_START = '{'
const BODY_END = '}';
const PLACE_HOLDER_START = ':';
const CHOICE_SEPARATOR = ','
const CHOICE_FLAG = '|'

let chars: number[] = [
    PLACE_HOLDER_START.charCodeAt(0),
    CHOICE_FLAG.charCodeAt(0),
    CHOICE_SEPARATOR.charCodeAt(0),
];

const alphaNumeric = []
for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    alphaNumeric.push(i)
}

for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    alphaNumeric.push(i)
}

for (let i = '0'.charCodeAt(0); i <= '9'.charCodeAt(0); i++) {
    alphaNumeric.push(i);
}

chars = chars.concat(alphaNumeric);

// Scan ahead to find if ${ has an end or is part of the ongoing token
/**
 * 
 * @param text The line to search
 * @param start The position to start from
 */
function findBodyEnd(text: string, start: number, allowSpace?: boolean) {

    for (let i = start; i < text.length; i++) {
        const char = text[i];

        switch (char) {
            case BODY_END:
                if (i === start) {
                    return -1;
                }
                return i;
            default: {
                const c = char.charCodeAt(0);
                if (chars.indexOf(c) == -1) {
                    if (char == ' ' && allowSpace) {
                        continue;
                    }
                    return -1;
                }
                
            }
        }
    }

    return -1;

}

export interface Scannable {
    findTokens(text: string): Token[]
}

class Parser implements Scannable {
    public findTokens(text: string): Token[] {
        const tokens: Token[] = [];
        let token: string = '';

        let started = false;
        let start: number = -1;
        let end: number = -1;

        for (let i: number = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            switch (char) {
                case START: {
                    if (nextChar == BODY_START) {
                        end = findBodyEnd(text, i + 2);
                        if (end != -1) {
                            if (start != -1) {
                                tokens.push({ start: start, end: i - 1, token });
                                token = '';
                            }
                            started = true;
                            start = i;
                        }
                    }
                    token += char;
                    break;
                }
                case BODY_END:
                    token += char;

                    if (started || i == text.length - 1) {
                        end = i;
                        if (start == -1) {
                            start = i;
                        }
                    }

                    if (started) {
                        tokens.push({ start, end, token, highlight: true });
                        start = -1;
                        end = -1;
                        token = ''
                        started = false;
                    }

                    break;
                default: {
                    if (start == -1) {
                        start = i;
                    }

                    token += char;
                }
            }

            if (i == text.length - 1 && token) {
                tokens.push({
                    start,
                    end: i,
                    token
                })
            }
        }

        return tokens

    }
}

let parser: Parser;

export function getParser(): Scannable {
    if (!parser)  {
        parser = new Parser();
    }
    
    return parser;
}