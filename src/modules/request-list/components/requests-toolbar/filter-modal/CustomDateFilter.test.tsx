import { fireEvent, screen } from "@testing-library/react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { CustomDateFilter } from "./CustomDateFilter";
import { render } from "../../../../test/render";

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date(2021, 8, 27));
});

afterAll(() => {
  jest.useRealTimers();
});

test("<CustomDateFilter /> renders the custom date filter correctly", () => {
  render(
    <CustomDateFilter
      initialValues={[new Date("2021-05-01"), new Date("2021-06-03")]}
      onChange={jest.fn()}
      errors={{}}
      allowFutureDates
    />
  );

  const startInput = screen.getByLabelText("Start");
  const endInput = screen.getByLabelText("End");

  expect(screen.getByText("May 2021")).toBeInTheDocument();
  expect(screen.getByText("June 2021")).toBeInTheDocument();
  expect(startInput).toHaveValue("May 1, 2021");
  expect(endInput).toHaveValue("June 3, 2021");
});

test("<CustomDateFilter /> calls onSelect when new dates are selected", async () => {
  const onChange = jest.fn();

  render(
    <ThemeProvider>
      <CustomDateFilter
        initialValues={[new Date(), new Date()]}
        onChange={onChange}
        errors={{}}
        allowFutureDates
      />
    </ThemeProvider>
  );

  const calendarItem_13_Sep = screen.getAllByText("13")[0]!;
  fireEvent.click(calendarItem_13_Sep);

  expect(onChange).toHaveBeenCalledWith([
    new Date("2021-09-13"),
    new Date("2021-09-27"),
  ]);

  const calendarItem_23_Sep = screen.getAllByText("23")[0]!;
  fireEvent.click(calendarItem_23_Sep);

  expect(onChange).toHaveBeenCalledWith([
    new Date("2021-09-13"),
    new Date("2021-09-23"),
  ]);
});
