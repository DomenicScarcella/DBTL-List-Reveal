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

describe("ListModular changes when clicking same list item once, then twice", () => {
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
        expect(document.querySelector("img#featured-image")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
    });

    test("should re-hide list item L1 AND undo id=active-match-L AND remove FeaturedMatch image after 2nd click on same list item", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        expect(document.querySelector("button.list-item.L.hide.L1")).toBeNull();
        expect(document.querySelector("button.list-item.L.unhide.L1#active-match-L")).toBeVisible();
        expect(document.querySelector("img#featured-image")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
        expect(document.querySelector("img#null-image")).toBeVisible();
        expect(document.querySelector("button#active-match-L")).toBeNull();
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeNull();
        expect(document.querySelector("button.list-item.L.hide.L1")).toBeVisible();
    })
});

describe("ListModular clicking several list items", () => {
    beforeEach(() => {
        render(<ListModular />);
    });

    test("clicking 5 list items once should unhide each of them, and set FeaturedMatch info to the last of those five clicks", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L3"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L5"));
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L2")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L3")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L4")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L5#active-match-L")).toBeVisible();
        expect(document.querySelector("img#featured-image")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L3"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L5"));
    });

    test("clicking all 5 listL items once should unhide each of them, and clicking 1 of the newly unhide listL items should hide it while leaving the other 4 items in unhide", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L3"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L5"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L3"));
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L2")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L3")).toBeNull();
        expect(document.querySelector("button.list-item.L.unhide.L4")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L5#active-match-L")).toBeVisible();
        expect(document.querySelector("img#featured-image")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L5"));
    });

    test("when all of listL is unhide, clicking list-item R1 should activate R1 and the similar list-item in listL (L4)", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L3"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L5"));
        fireEvent.click(document.querySelector("button.list-item.R.hide.R1"));
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L2")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L3")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L4#active-match-L")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L5")).toBeVisible();
        expect(document.querySelector("button.list-item.R.unhide.R1#active-match-R")).toBeVisible();
        expect(document.querySelector("img#featured-image")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L3"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L5"));
        fireEvent.click(document.querySelector("button.list-item.R.unhide.R1"));
    });
});

describe("ListModular clicking the featured-image when FeaturedMatch has active image displayed", () => {
    beforeEach(() => {
        render(<ListModular />);
    });

    test("unhide all list items and click on featured-image should remove featured-image but leave all list items in unhide", () => {
        fireEvent.click(document.querySelector("button.list-item.L.hide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L3"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.hide.L5"));
        fireEvent.click(document.querySelector("button.list-item.R.hide.R1"));
        fireEvent.click(document.querySelector("button.list-item.R.hide.R2"));
        fireEvent.click(document.querySelector("button.list-item.R.hide.R3"));
        fireEvent.click(document.querySelector("button.list-item.R.hide.R4"));
        fireEvent.click(document.querySelector("button.list-item.R.hide.R5"));
        expect(document.querySelector("img#featured-image")).toBeVisible();
        fireEvent.click(document.querySelector("img#featured-image"));
        expect(document.querySelector("img#featured-image")).toBeNull();
        expect(document.querySelector("button.list-item.L.unhide.L1")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L2")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L3")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L4")).toBeVisible();
        expect(document.querySelector("button.list-item.L.unhide.L5")).toBeVisible();
        expect(document.querySelector("button.list-item.R.unhide.R1")).toBeVisible();
        expect(document.querySelector("button.list-item.R.unhide.R2")).toBeVisible();
        expect(document.querySelector("button.list-item.R.unhide.R3")).toBeVisible();
        expect(document.querySelector("button.list-item.R.unhide.R4")).toBeVisible();
        expect(document.querySelector("button.list-item.R.unhide.R5")).toBeVisible();
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L1"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L2"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L3"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L4"));
        fireEvent.click(document.querySelector("button.list-item.L.unhide.L5"));
        fireEvent.click(document.querySelector("button.list-item.R.unhide.R1"));
        fireEvent.click(document.querySelector("button.list-item.R.unhide.R2"));
        fireEvent.click(document.querySelector("button.list-item.R.unhide.R3"));
        fireEvent.click(document.querySelector("button.list-item.R.unhide.R4"));
        fireEvent.click(document.querySelector("button.list-item.R.unhide.R5"));

    });
});



