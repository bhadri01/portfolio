import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Logo from "./Logo";

afterEach(cleanup);

describe("<Logo />", () => {
  it("renders light and dark mark variants", () => {
    render(<Logo />);
    const imgs = screen.getAllByAltText("Bhadrinathan logo");
    expect(imgs).toHaveLength(2);
    const sources = imgs.map((i) => i.getAttribute("src"));
    expect(sources).toContain("/logo-mark.svg");
    expect(sources).toContain("/logo-mark-dark.svg");
  });

  it("shows the wordmark when requested", () => {
    render(<Logo showWordmark />);
    expect(screen.getByText("BHADRINATHAN")).toBeInTheDocument();
  });

  it("applies the requested size", () => {
    render(<Logo size={48} />);
    const img = screen.getAllByAltText("Bhadrinathan logo")[0];
    expect(img).toHaveStyle({ height: "48px" });
  });
});
