import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { ChatShowcase } from "../ChatShowcase";

const props = {
  labels: { agent: "Orazaka", status: "Online · local", model: "local", routed: "Routed locally", privacy: "Nothing leaves", placeholder: "Ask" },
  question: "Summarise this contract",
  answer: "The contract renews yearly. ".repeat(6).trim(),
  pipeline: ["Context", "Security", "Credits", "Validation"],
};

/** The conversation is sized by an invisible copy of its final state, so the card never grows while it plays. */
describe("ChatShowcase layout stability", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const ghost = (c: HTMLElement) => c.querySelector("[data-chat-ghost]") as HTMLElement;

  it("reserves the final state from the very first frame", () => {
    const { container } = render(<ChatShowcase {...props} />);
    expect(ghost(container)).toHaveAttribute("aria-hidden", "true");
    expect(ghost(container).className).toContain("invisible");
    expect(ghost(container).textContent).toContain(props.answer);
    for (const step of props.pipeline) expect(ghost(container).textContent).toContain(step);
  });

  it("keeps the same reserved content at every phase and at the end", () => {
    const { container } = render(<ChatShowcase {...props} />);
    const start = ghost(container).innerHTML;
    for (const ms of [700, 700, 1100, 200]) act(() => void jest.advanceTimersByTime(ms));
    expect(ghost(container).innerHTML).toBe(start);
    act(() => void jest.advanceTimersByTime(5000));
    expect(ghost(container).innerHTML).toBe(start);
  });

  it("shows the final state directly under reduced motion", () => {
    window.matchMedia = ((q: string) => ({ matches: q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} })) as never;
    const { container } = render(<ChatShowcase {...props} />);
    const live = ghost(container).nextElementSibling as HTMLElement;
    expect(live.textContent).toContain(props.answer);
    expect(live.textContent).toContain("Validation");
  });
});
