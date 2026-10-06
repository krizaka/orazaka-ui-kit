import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog } from "../Dialog";

describe("Dialog", () => {
  const baseProps = {
    open: true,
    onClose: jest.fn(),
    title: "Add connection",
    closeLabel: "Close",
  };

  afterEach(() => jest.clearAllMocks());

  it("renders nothing when closed", () => {
    render(
      <Dialog {...baseProps} open={false}>
        <p>Body</p>
      </Dialog>,
    );
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("renders title and children when open", () => {
    render(
      <Dialog {...baseProps}>
        <p>Body</p>
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Add connection")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <Dialog {...baseProps}>
        <p>Body</p>
      </Dialog>,
    );
    fireEvent.click(screen.getByLabelText("Close"));
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape", () => {
    render(
      <Dialog {...baseProps}>
        <p>Body</p>
      </Dialog>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when the panel itself is clicked", () => {
    render(
      <Dialog {...baseProps}>
        <p>Body</p>
      </Dialog>,
    );
    fireEvent.mouseDown(screen.getByRole("dialog"));
    expect(baseProps.onClose).not.toHaveBeenCalled();
  });
});
