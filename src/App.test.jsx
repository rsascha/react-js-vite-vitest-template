import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import App from "./App";

describe("App", () => {
  it("should contain the text 'Vite + React'", async () => {
    render(<App />);
    expect(await screen.findByText("Vite + React")).toBeDefined();
  });
});
