import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ToastContainer, type ToastItem } from "../Toast";

const toasts: ToastItem[] = [
  { id: "1", message: "Saved", variant: "success" },
  { id: "2", message: "Failed", variant: "error" },
];

describe("ToastContainer", () => {
  it("renders nothing without toasts", () => {
    const { container } = render(<ToastContainer toasts={[]} onDismiss={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each toast with its status role colour", () => {
    render(<ToastContainer toasts={toasts} onDismiss={jest.fn()} />);
    const alerts = screen.getAllByRole("alert");
    expect(alerts).toHaveLength(2);
    expect(alerts[0].className).toContain("border-success/20");
    expect(alerts[1].className).toContain("border-danger/20");
    expect(alerts[1].innerHTML).not.toMatch(/dark[:]|rose-|emerald-/);
  });

  it("dismisses a toast", () => {
    const onDismiss = jest.fn();
    render(<ToastContainer toasts={[toasts[0]]} onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText("Dismiss notification"));
    expect(onDismiss).toHaveBeenCalledWith("1");
  });
});
