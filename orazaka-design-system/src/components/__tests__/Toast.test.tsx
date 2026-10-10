import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { ToastContainer, type ToastItem } from "../Toast";

const toasts: ToastItem[] = [
  { id: "1", message: "Saved", variant: "success" },
  { id: "2", message: "Failed", variant: "error" },
];

describe("ToastContainer (1.x API on the @krizaka/ui Toaster)", () => {
  it("renders the notifications region and no toast without toasts", () => {
    render(<ToastContainer toasts={[]} onDismiss={jest.fn()} label="Notifications" />);
    expect(screen.getByLabelText(/Notifications/)).toBeInTheDocument();
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  it("shows each toast, typed by its variant", async () => {
    render(<ToastContainer toasts={toasts} onDismiss={jest.fn()} />);
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(await screen.findByText("Failed")).toBeInTheDocument();
    expect(screen.getByText("Saved").closest("[data-type]")).toHaveAttribute("data-type", "success");
    expect(screen.getByText("Failed").closest("[data-type]")).toHaveAttribute("data-type", "error");
  });

  it("calls onDismiss with the id when a toast is closed", async () => {
    const onDismiss = jest.fn();
    render(<ToastContainer toasts={[toasts[0]]} onDismiss={onDismiss} />);
    await screen.findByText("Saved");
    await act(async () => {
      fireEvent.click(within(screen.getByText("Saved").closest("li") as HTMLElement).getByLabelText("Dismiss notification"));
    });
    expect(onDismiss).toHaveBeenCalledWith("1");
  });
});
