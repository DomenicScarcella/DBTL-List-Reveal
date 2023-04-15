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

    test("should display large wmlogo", () => {
        expect(screen.queryByAltText(/Large graphic of WrestleMania 39 logo/)).toBeVisible();
    });

    test("should NOT display 'John's List' initially ", () => {
        expect(screen.queryByText(/John's List/)).toBeNull();
    });

    test("should NOT display 'Dom's List' initially ", () => {
        expect(screen.queryByText(/Dom's List/)).toBeNull();
    });

    test("should NOT display spotlight graphic initially", () => {
        expect(screen.queryByAltText(/A pair of hanging spotlights shining on the main image area in the center of the screen/)).toBeNull();
    });
});

describe("App after clicking wmlogo img (id='open-logo') ", () => {
    beforeEach(() => {
        render(<App />);
        fireEvent.click(document.getElementById("open-logo"));
    });

    test("should still display '#DontBuryTheLead' ", () => {
        expect(screen.queryByText(/#DontBuryTheLead/)).toBeVisible();
    });

    test("should still display 'PREVIEW:' ", () => {
        expect(screen.queryByText(/PREVIEW:/)).toBeVisible();
    });

    test("should still display 'Top 5 Matches We Want To See' ", () => {
        expect(screen.queryByText(/Top 5 Matches We Want To See/)).toBeVisible();
    });

    test("should NOT display large wmlogo after click on wmlogo", () => {
        expect(screen.queryByAltText(/Large graphic of WrestleMania 39 logo/)).toBeNull();
    });

    test("should display 'John's List' after click on wmlogo", () => {
        expect(screen.queryByText(/John's List/)).toBeVisible();
    });

    test("should display 'Dom's List' after click on wmlogo", () => {
        expect(screen.queryByText(/Dom's List/)).toBeVisible();
    });

    test("should display spotlight graphic after click on wmlogo", () => {
        expect(screen.queryByAltText(/A pair of hanging spotlights shining on the main image area in the center of the screen/)).toBeVisible();
    });
});
