import { act, render, screen } from "@testing-library/react";
import RelativeTime from "./RelativeTime";
import { addSeconds, addMinutes } from "date-fns";

describe("RelativeTime", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-05-18T18:00:00Z"));
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it(`should display "This minute" if less than one minute is elapsed`, async () => {
    const date = addSeconds(new Date(), -30);
    render(<RelativeTime date={date} locale="en" />);

    expect(await screen.findByText("This minute")).toBeDefined();
  });

  it(`should display "X minutes ago" if less than one hour is elapsed`, async () => {
    const date = addMinutes(new Date(), -27);
    render(<RelativeTime date={date} locale="en" />);

    expect(await screen.findByText("27 minutes ago")).toBeDefined();
  });

  it(`should display "Today, TIME" if same day and more than one hour is elapsed`, async () => {
    const date = new Date("2022-05-18T10:23:35Z");
    render(<RelativeTime date={date} locale="en" />);

    expect(await screen.findByText("Today, 10:23 AM")).toBeDefined();
  });

  it(`should display "Yesterday, TIME" if previous day`, async () => {
    const date = new Date("2022-05-17T10:23:35Z");
    render(<RelativeTime date={date} locale="en" />);

    expect(await screen.findByText("Yesterday, 10:23 AM")).toBeDefined();
  });

  it(`should display "DATE, TIME" if before yesterday`, async () => {
    const date = new Date("2022-05-10T10:23:35Z");
    render(<RelativeTime date={date} locale="en" />);

    expect(await screen.findByText("May 10, 2022, 10:23 AM")).toBeDefined();
  });

  it(`should display "DATE, TIME" if future date`, async () => {
    const date = new Date("2022-05-19T10:23:35Z");
    render(<RelativeTime date={date} locale="en" />);

    expect(await screen.findByText("May 19, 2022, 10:23 AM")).toBeDefined();
  });

  it(`should display "DATE, TIME" if before yesterday in the passed locale`, async () => {
    const date = new Date("2022-05-10T10:23:35Z");
    render(<RelativeTime date={date} locale="da" />);

    expect(
      await screen.findByText(
        (content) =>
          content.includes("10. maj 2022") && content.includes("10.23")
      )
    ).toBeDefined();
  });

  it("should update when changing locale", async () => {
    const date = addMinutes(new Date(), -12);

    const { rerender } = render(<RelativeTime date={date} locale="en" />);
    expect(screen.getByText("12 minutes ago")).toBeDefined();

    rerender(<RelativeTime date={date} locale="da" />);
    expect(await screen.findByText("For 12 minutter siden")).toBeDefined();
  });

  it("should update value over time", async () => {
    render(<RelativeTime date={new Date()} locale="en" />);
    expect(screen.getByText("This minute")).toBeDefined();

    act(() => {
      jest.advanceTimersByTime(60_000 * 3);
    });
    expect(await screen.findByText("3 minutes ago")).toBeDefined();
  });
});
