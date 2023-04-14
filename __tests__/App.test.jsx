import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import "@testing-library/dom";
import { App } from "../src/App.jsx";

describe("App on initial rendering", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("should display '#DontBuryTheLead' ", () => {
        expect(screen.queryByText(/#DontBuryTheLead/)).toBeVisible();
    });

    test("should display 'PREVIEW:' ", () => {
        expect(screen.queryByText(/PREVIEW:/)).toBeVisible();
    });

    test("should display 'Top 5 Matches We Want To See' ", () => {
        expect(screen.queryByText(/Top 5 Matches We Want To See/)).toBeVisible();
    });

    test("should NOT display 'John's List' initially ", () => {
        expect(screen.queryByText(/John's List"/)).toBeNull();
    });
});

describe("App after clicking wmlogo img (id='open-logo') ", () => {
    beforeEach(() => {
        render(<App />);
        fireEvent.click(document.getElementById("open-logo"));
    });

    test("should display '#DontBuryTheLead' ", () => {
        expect(screen.queryByText(/#DontBuryTheLead/)).toBeVisible();
    });

    test("should display 'PREVIEW:' ", () => {
        expect(screen.queryByText(/PREVIEW:/)).toBeVisible();
    });

    test("should display 'Top 5 Matches We Want To See' ", () => {
        expect(screen.queryByText(/Top 5 Matches We Want To See/)).toBeVisible();
    });

    test("after click event on wmlogo, should display 'John's List' ", () =>{
        expect(screen.queryByText(/John's List/)).toBeVisible();
    });
});
