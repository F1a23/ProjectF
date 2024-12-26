import "@testing-library/jest-dom"; // Import jest-dom for custom matchers

import { describe, it, expect } from "vitest"; // Import expect from Vitest

import { render, screen } from "@testing-library/react"; // Import rendering utilities

import About from "../src/Components/About";

import React from "react";

describe("About", () => {
  it("should render the About component", () => {
    render(<About />); // Render the About component in the virtual DOM provided by the testing library

    //Assertion: check if there is an h1 element

    const aboutElement = screen.getByRole("heading", { level: 1 });

    expect(aboutElement).toBeInTheDocument();
  });

  it("should have the text about", () => {
    render(<About />);

    const text = screen.queryByText(/about/i);

    expect(text).toBeInTheDocument();
  });

  it("should have the image", () => {
    render(<About />);

    const image = screen.getByAltText("devimage");

    expect(image).toHaveClass("userImage");
  });
});
