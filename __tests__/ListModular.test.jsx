import { render, screen, fireEvent, getAllByAltText } from "@testing-library/react";
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

    test("all 10 list items should also have 'hide' class", () => {
        const listItems = document.getElementsByClassName("list-item hide").length;
        expect(listItems == 10).toBeTruthy();
    });

    test("zero list items should have 'unhide' class", () => {
        const listItems = document.getElementsByClassName("list-item unhide").length;
        expect(listItems == 0).toBeTruthy();
    });

    test("title text for Rhea Ripley matches should technically render -- twice -- even though styling hides visibility", () => {
        const rheas = screen.queryAllByText(/ vs. Rhea Ripley/).length;
        expect(rheas == 2).toBeTruthy();
    });

    test("should display 'null-image' for FeaturedMatch initially", () => {
        expect(document.getElementById("null-image")).toBeVisible();
    });

    test("should NOT display 'featured-image' initially", () => {
        expect(document.getElementById("featured-image")).toBeNull();
    });   
});

describe("ListModular after various click combinations", () => {
    beforeEach(() => {
        render(<ListModular />);
    });

    test("should unhide list item after 1 click and set FeaturedMatch image", () => {
        fireEvent.click(document.querySelector("button.L1"));
        expect(document.querySelector("img#featured-image")).toBeVisible();

    })


});





