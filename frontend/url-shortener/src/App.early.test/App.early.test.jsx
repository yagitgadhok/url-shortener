import React from "react";
import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("App() App method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    test("should render input and button correctly", () => {
      // Render the App component
      render(<App />);

      // Check if the input and button are rendered
      const inputElement = screen.getByPlaceholderText(
        "Enter URL to be shorten"
      );
      const buttonElement = screen.getByRole("button", {
        name: /shorten url/i,
      });

      // Assert that the input and button are in the document
      expect(inputElement).toBeInTheDocument();
      expect(buttonElement).toBeInTheDocument();
    });

    test("should update input value on change", () => {
      // Render the App component
      render(<App />);

      // Get the input element
      const inputElement = screen.getByPlaceholderText(
        "Enter URL to be shorten"
      );

      // Simulate user typing a URL
      fireEvent.change(inputElement, {
        target: { value: "https://example.com" },
      });

      // Assert that the input value is updated
      expect(inputElement.value).toBe("https://example.com");
    });

    test("should log the URL when button is clicked", () => {
      // Mock console.log
      console.log = jest.fn();

      // Render the App component
      render(<App />);

      // Get the input and button elements
      const inputElement = screen.getByPlaceholderText(
        "Enter URL to be shorten"
      );
      const buttonElement = screen.getByRole("button", {
        name: /shorten url/i,
      });

      // Simulate user typing a URL and clicking the button
      fireEvent.change(inputElement, {
        target: { value: "https://example.com" },
      });
      fireEvent.click(buttonElement);

      // Assert that console.log was called with the correct URL
      expect(console.log).toHaveBeenCalledWith("url:", "https://example.com");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    test("should handle empty input gracefully", () => {
      // Mock console.log
      console.log = jest.fn();

      // Render the App component
      render(<App />);

      // Get the button element
      const buttonElement = screen.getByRole("button", {
        name: /shorten url/i,
      });

      // Simulate clicking the button without entering a URL
      fireEvent.click(buttonElement);

      // Assert that console.log was called with an empty string
      expect(console.log).toHaveBeenCalledWith("url:", "");
    });

    test("should handle very long URL input", () => {
      // Mock console.log
      console.log = jest.fn();

      // Render the App component
      render(<App />);

      // Get the input and button elements
      const inputElement = screen.getByPlaceholderText(
        "Enter URL to be shorten"
      );
      const buttonElement = screen.getByRole("button", {
        name: /shorten url/i,
      });

      // Simulate user typing a very long URL
      const longUrl = "https://example.com/" + "a".repeat(1000);
      fireEvent.change(inputElement, { target: { value: longUrl } });
      fireEvent.click(buttonElement);

      // Assert that console.log was called with the long URL
      expect(console.log).toHaveBeenCalledWith("url:", longUrl);
    });
  });
});
