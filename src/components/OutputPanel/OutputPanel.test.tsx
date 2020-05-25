import * as React from 'react';

import { render } from '@testing-library/react'

import { OutputPanel } from './OutputPanel';

describe("OutputPanel", () => {
    it("Should render OutputPanel", () => {
        const text = "test\n${4}";
        const result = render(<OutputPanel text={text} />);

        const element = result.getByText("${4}");
        expect(element.className).toBe("token");
    });

    it("Should render OutputPanel", () => {
        const text = "test\n\n${4}";
        const result = render(<OutputPanel text={text} />);

        let element = result.getByText("test");
        expect(element).toBeInTheDocument();

        element = result.getByText("${4}");
        expect(element.className).toBe("token");
        expect(element).toBeInTheDocument();

        const emptyLines = result.getAllByText("", { selector: "span" });
        expect(emptyLines).toHaveLength(1);
    });

    it("Should render OutputPanel", () => {
        const text = "test\n\n${4}\n";
        const result = render(<OutputPanel text={text} />);

        const elements = result.container.querySelectorAll('span');
        expect(elements).toHaveLength(4);
    });
});