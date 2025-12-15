const fetchAllCursorPages = jest.fn();
jest.mock("../utils/pagination/fetchAllCursorPages", () => ({
  fetchAllCursorPages,
}));

import type { TicketField } from "../data-types";
import { renderHook } from "@testing-library/react-hooks";
import { useTicketFields } from "./useTicketFields";

const activeTicketField: TicketField = {
  id: 10,
  type: "subject",
  active: true,
  title: "Subject",
  title_in_portal: "Subject",
  description: "",
  custom_field_options: [],
};

const inactiveTicketField: TicketField = {
  id: 20,
  type: "text",
  active: false,
  title: "Inactive field",
  title_in_portal: "Inactive field",
  description: "",
  custom_field_options: [],
};

test("fetches all ticket fields via ticket_fields api call and returns the active ones", async () => {
  fetchAllCursorPages.mockReturnValueOnce([
    activeTicketField,
    inactiveTicketField,
  ]);

  const { result, waitForNextUpdate } = renderHook(() => useTicketFields("dk"));

  await waitForNextUpdate();

  expect(fetchAllCursorPages.mock.calls[0][1]).toEqual("ticket_fields");

  expect(result.current).toEqual({
    ticketFields: [activeTicketField],
    error: undefined,
    isLoading: false,
  });
});

test("handles exceptions", async () => {
  fetchAllCursorPages.mockRejectedValue("Network error");

  const { result, waitForNextUpdate } = renderHook(() => useTicketFields("dk"));

  await waitForNextUpdate();

  expect(result.current).toEqual({
    ticketFields: [],
    error: "Network error",
    isLoading: true,
  });
});
