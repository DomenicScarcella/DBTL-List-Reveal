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

describe("ListModular after clicking same list item once, then twice", () => {
    beforeEach(() => {
        render(<ListModular />);
    });

    test("should unhide list item L1 after 1st click", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        expect(document.querySelector("button.list-item.L.hide.L1")).toBeNull();
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
    });

    test("should set list item to id=active-match-L after 1 click", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        expect(document.querySelector("button#active-match-L")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
    });

    test("should display image for FeaturedMatch after 1 click", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        expect(document.querySelector("img.L1_unhide")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
    });

    test("should re-hide list item L1 AND undo id=active-match-L AND remove FeaturedMatch image after 2nd click on same list item", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        expect(document.querySelector("button.list-item.L.hide.L1")).toBeNull();
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeVisible();
        expect(document.querySelector("button#active-match-L")).toBeVisible();
        expect(document.querySelector("img.L1_unhide")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
        expect(document.querySelector("img.L1_unhide")).toBeNull();
        expect(document.querySelector("button#active-match-L")).toBeNull();
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeNull();
        expect(document.querySelector("button.list-item.L.hide.L1")).toBeVisible();
    })

        



});





