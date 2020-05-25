import { getParser } from './parser';

describe("parser", () => {

    let parser = getParser();
    it('Should return all token without placeholders', () => {
        const testString = "${4} ${4}";
        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(3);
        expect(tokens).toMatchObject([{
            start: 0, end: 3, token: "${4}",
        },
        {
            start: 4, end: 4, token: " ",
        },
        {
            start: 5, end: 8, token: "${4}"
        }]);
    });

    it("Should return all tokens with placeholders", () => {
        const testString = "${4:test} ${4}";

        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(3);
        expect(tokens).toMatchObject([{
            start: 0, end: 8, token: "${4:test}"
        },
        { start: 9, end: 9, token: " " },
        {
            start: 10, end: 13
        }]);
    });

    it("Should return all tokens", () => {
        const testString = "${5} gfds dfsg {423423}";

        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(2);
        expect(tokens).toMatchObject([{
            start: 0, end: 3, token: "${5}"
        },
        { start: 4, end: 22, token: " gfds dfsg {423423}" },
        ]);        
    });

    it("Should parse string ending with $", () => {
        const testString = "${5} gfds dfsg {423423} $";

        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(2);
        expect(tokens).toMatchObject([{
            start: 0, end: 3, token: "${5}"
        },
        { start: 4, end: 24, token: " gfds dfsg {423423} $" },
        ]);        
    });

    it("Should parse string ending with `${`", () => {
        const testString = "${5} gfds dfsg {423423} ${";

        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(2);
        expect(tokens).toMatchObject([{
            start: 0, end: 3, token: "${5}"
        },
        { start: 4, end: 25, token: " gfds dfsg {423423} ${" },
        ]);        
    });

    it("Should extract the token 'test ${test()}'", () => {
        const testString = "test ${test()}";

        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(1);
        expect(tokens).toMatchObject([
        { start: 0, end: 13, token: "test ${test()}" },
        ]);        
    });

    it("Should extract the token 'test ${test ${test}}'", () => {
        const testString = "test ${test ${test}}";

        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(3);
        expect(tokens).toMatchObject([
            {start: 0, end: 11, token: "test ${test "},
        { start: 12, end: 18, token: "${test}" },
        { start: 19, end: 19, token: "}" },
        ]);        
    });

    it("Should should extra 1 token for test ${}'", () => {
        const testString = "test ${}";

        const tokens = parser.findTokens(testString);

        expect(tokens.length).toBe(1);
        expect(tokens).toMatchObject([
            {start: 0, end: 7, token: "test ${}"},
        ]);        
    });
});