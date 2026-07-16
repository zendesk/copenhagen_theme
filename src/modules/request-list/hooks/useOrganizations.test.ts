const fetchAllCursorPages = jest.fn();
jest.mock("../utils/pagination/fetchAllCursorPages", () => ({
  fetchAllCursorPages,
}));

import type { User, OrganizationMembership, Organization } from "../data-types";
import { renderHook, waitFor } from "@testing-library/react";
import { useOrganizations } from "./useOrganizations";

const user: User = {
  id: 10,
  name: "Halloumi",
  role: "end-user",
  organization_id: "10",
  locale: "en-us",
  authenticity_token: "12345",
};

const memberships: OrganizationMembership[] = [
  {
    organization_id: 10,
    organization_name: "Organization",
    default: true,
    view_tickets: true,
  },
  {
    organization_id: 20,
    organization_name: "Organization with hidden tickets",
    default: false,
    view_tickets: false,
  },
];

test("fetches all user organizations with ticket permissions via organization_memberships api call", async () => {
  fetchAllCursorPages.mockReturnValueOnce(memberships);

  const { result } = renderHook(() => useOrganizations(user));

  const organization: Organization = {
    id: 10,
    name: "Organization",
    default: true,
  };

  await waitFor(() => {
    expect(result.current).toEqual({
      organizations: [organization],
      error: undefined,
    });
  });

  expect(fetchAllCursorPages.mock.calls[0][1]).toEqual(
    "organization_memberships"
  );
});

test("handles exceptions", async () => {
  fetchAllCursorPages.mockRejectedValue("Network error");

  const { result } = renderHook(() => useOrganizations(user));

  await waitFor(() => {
    expect(result.current).toEqual({
      organizations: [],
      error: "Network error",
    });
  });
});
