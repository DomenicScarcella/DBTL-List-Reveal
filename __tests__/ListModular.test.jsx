import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import "@testing-library/dom";
import { ListModular } from "../src/ListModular.jsx";

describe("ListModular on initial rendering", () => {
    beforeEach(() => {
        render(<ListModular />);
    });

    test("should display 'John's List' ", () => {
        expect(screen.queryByText(/John's List/)).toBeVisible();
    });

    test("should display 'Dom's List' ", () => {
        expect(screen.queryByText(/Dom's List/)).toBeVisible();
    });

    test("should display spotlight graphic", () => {
        expect(screen.queryByAltText(/A pair of hanging spotlights shining on the main image area in the center of the screen/)).toBeVisible();
    });

    test("should display a total of 10 list items (5 for each of 2 lists)", () => {
        const listItems = document.getElementsByClassName("list-item").length;
        expect(listItems == 10).toBeTruthy();
    });

    test("should display 'null-image' for FeaturedMatch initially", () => {
        expect(document.getElementById("null-image")).toBeVisible();
    });

    test("should NOT display 'featured-image' initially", () => {
        expect(document.getElementById("featured-image")).toBeNull();
    });   
});