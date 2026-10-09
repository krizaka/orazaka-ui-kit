import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Skeleton, SkeletonGroup } from "../Skeleton";

describe("Skeleton", () => {
  it("is a rect by default, hidden from assistive technology", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild;
    expect(el).toHaveAttribute("data-shape", "rect");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el?.className).toContain("bg-surface-3");
  });

  it("maps the deprecated variant to shape", () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstElementChild).toHaveAttribute("data-shape", "circle");
  });

  it("keeps the deprecated width and height as inline sizes", () => {
    const { container } = render(<Skeleton width="60%" height="1rem" />);
    expect(container.firstElementChild).toHaveStyle({ width: "60%", height: "1rem" });
  });

  it("lets a className size it", () => {
    const { container } = render(<Skeleton shape="text" className="h-4 w-32" />);
    const classes = container.firstElementChild?.className.split(" ") ?? [];
    expect(classes).toContain("h-4");
    expect(classes).not.toContain("h-3");
  });
});

describe("SkeletonGroup", () => {
  it("renders the requested number of text lines, the last one shorter", () => {
    const { container } = render(<SkeletonGroup lines={4} />);
    const lines = container.querySelectorAll("[data-shape='text']");
    expect(lines).toHaveLength(4);
    expect(lines[3].className).toContain("w-3/5");
  });
});
