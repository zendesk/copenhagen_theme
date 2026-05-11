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

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches all ticket fields via ticket_fields api call and returns the active ones", async () => {
  fetchAllCursorPages
    .mockResolvedValueOnce([activeTicketField, inactiveTicketField])
    .mockResolvedValueOnce([
      {
        id: 1,
        active: true,
        ticket_field_ids: [10],
      },
    ]);

  const { result, waitForNextUpdate } = renderHook(() => useTicketFields("dk"));

  await waitForNextUpdate();

  expect(fetchAllCursorPages.mock.calls[0][1]).toEqual("ticket_fields");
  expect(fetchAllCursorPages.mock.calls[1][1]).toEqual("ticket_forms");

  expect(result.current).toEqual({
    ticketFields: [activeTicketField],
    error: undefined,
    isLoading: false,
  });
});

test("handles exceptions", async () => {
  fetchAllCursorPages.mockRejectedValueOnce(new Error("Network error"));

  const { result, waitForNextUpdate } = renderHook(() => useTicketFields("dk"));

  await waitForNextUpdate();

  expect(result.current.error).toEqual(new Error("Network error"));
  expect(result.current.ticketFields).toEqual([]);
  expect(result.current.isLoading).toBe(false);
});

test("filters out inactive subject field", async () => {
  const inactiveSubjectField: TicketField = {
    id: 30,
    type: "subject",
    active: false,
    title: "Subject",
    title_in_portal: "Subject",
    description: "",
    custom_field_options: [],
  };

  fetchAllCursorPages
    .mockResolvedValueOnce([activeTicketField, inactiveSubjectField])
    .mockResolvedValueOnce([
      {
        id: 1,
        active: true,
        ticket_field_ids: [10, 30],
      },
    ]);

  const { result, waitForNextUpdate } = renderHook(() => useTicketFields("dk"));

  await waitForNextUpdate();

  expect(result.current).toEqual({
    ticketFields: [activeTicketField],
    error: undefined,
    isLoading: false,
  });
});

test("only returns ticket fields present in active ticket forms", async () => {
  const activeCustomField40: TicketField = {
    ...inactiveTicketField,
    id: 40,
    active: true,
    title: "Active field 40",
    title_in_portal: "Active field 40",
  };

  fetchAllCursorPages
    .mockResolvedValueOnce([
      activeTicketField,
      { ...inactiveTicketField, id: 30, active: true },
      activeCustomField40,
    ])
    .mockResolvedValueOnce([
      { id: 1, active: true, ticket_field_ids: [10, 40] },
    ]);

  const { result, waitForNextUpdate } = renderHook(() => useTicketFields("dk"));

  await waitForNextUpdate();

  expect(result.current).toEqual({
    ticketFields: [activeTicketField, activeCustomField40],
    error: undefined,
    isLoading: false,
  });
});
