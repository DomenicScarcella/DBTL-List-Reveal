import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import "@testing-library/dom";
import { ListModular } from "../src/ListModular.jsx";

describe("ListModular on initial rendering", () => {
    beforeEach(() => {
        render(<ListModular />);
    });

    test("should display spotlight graphic", () => {
        expect(screen.queryByAltText(/A pair of hanging spotlights shining on the main image area in the center of the screen/)).toBeVisible();
    });

    test("should display 'null-image' for FeaturedMatch on initial rendering", () => {
        expect(document.getElementById("null-image")).toBeVisible();
    });

    test("should NOT display 'featured-image' on initial rendering", () => {
        expect(document.getElementById("featured-image")).toBeNull();
    });

    
    
});