jest.mock("../../../../shared/notifications/notify");

import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import FollowOrganizationsModal from "./FollowOrganizationsModal";
import { render } from "../../../../test/render";
import type { User } from "../../../data-types";
import { notify } from "../../../../shared";
import { useOrganizations } from "../../../hooks/useOrganizations";

const user: User = {
  id: 10,
  name: "Hyacinth",
  role: "end-user",
  organization_id: "10",
  locale: "en-us",
  authenticity_token: "12345",
};

const props = {
  organizations: [
    { id: 1, name: "org_1", default: true },
    { id: 2, name: "org_2", default: false },
    { id: 3, name: "org_3", default: false },
    { id: 4, name: "org_4", default: false },
  ],
  user: user,
  onClose: jest.fn(),
};

const defaultSubscriptionResponse = {
  organization_subscriptions: [
    {
      created_at: "",
      id: 1,
      organization_id: 1,
      user_id: props.user.id,
      url: "/api/v2/organization_subscriptions/1.json",
    },
    {
      created_at: "",
      id: 2,
      organization_id: 2,
      user_id: props.user.id,
      url: "/api/v2/organization_subscriptions/2.json",
    },
  ],
  meta: {
    has_more: true,
  },
  links: {
    next: `/api/v2/users/${props.user.id}/organization_subscriptions.json?page[size]=100&cursor=2`,
  },
};

const subscribeResponse = {
  organization_subscriptions: [
    {
      created_at: "2025-01-17T12:48:06Z",
      id: 1,
      organization_id: 1,
      user_id: props.user.id,
      url: "/api/v2/organization_subscriptions/1.json",
    },
  ],
};

const secondPageSubscriptionResponse = {
  organization_subscriptions: [
    {
      created_at: "",
      id: 3,
      organization_id: 7,
      user_id: props.user.id,
      url: "/api/v2/organization_subscriptions/3.json",
    },
    {
      created_at: "",
      id: 4,
      organization_id: 8,
      user_id: props.user.id,
      url: "/api/v2/organization_subscriptions/4.json",
    },
  ],
  meta: {
    has_more: false,
  },
  links: {
    next: `/api/v2/users/${props.user.id}/organization_subscriptions.json?page[size]=100&cursor=2`,
  },
};

(globalThis.fetch as jest.Mock) = jest.fn((url, options) => {
  let response:
    | typeof defaultSubscriptionResponse
    | typeof secondPageSubscriptionResponse
    | typeof subscribeResponse
    | { error: string };

  let status = true;
  if (
    url ===
    `/api/v2/users/${props.user.id}/organization_subscriptions.json?page[size]=100`
  ) {
    response = defaultSubscriptionResponse;
  } else if (
    url ===
    `/api/v2/users/${props.user.id}/organization_subscriptions.json?page[size]=100&cursor=2`
  ) {
    response = secondPageSubscriptionResponse;
  } else if (
    url === "/api/v2/organization_subscriptions.json" &&
    options?.method === "POST"
  ) {
    const body = JSON.parse(options.body);
    if (body.organization_subscription.organization_id === 4) {
      // Simulate subscribe failure for subscription with id 4
      status = false;
      response = { error: "Internal Server Error" };
    } else {
      response = subscribeResponse;
    }
  } else if (url === `/api/v2/organization_subscriptions/2.json`) {
    status = true;
    // Simulate unsubscribe failure for subscription with id 4
  } else if (url === `/api/v2/organization_subscriptions/4.json`) {
    status = false;
    response = { error: "Not Found" };
  } else {
    response = defaultSubscriptionResponse;
  }

  return Promise.resolve({
    ok: status,
    json: () => Promise.resolve(response),
  });
});

const renderComponent = async () => {
  render(<FollowOrganizationsModal {...props} />);

  await act(() => Promise.resolve());
};

describe("Follow organizations modal", () => {
  afterEach(() => {
    props.onClose.mockReset();
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    test("it correctly sets the initial state of the checkboxes", async () => {
      await renderComponent();

      expect(
        (screen.getByRole("checkbox", { name: /org_1/ }) as HTMLInputElement)
          .checked
      ).toBe(true);
      expect(
        (screen.getByRole("checkbox", { name: /org_2/ }) as HTMLInputElement)
          .checked
      ).toBe(true);
      expect(
        (screen.getByRole("checkbox", { name: /org_3/ }) as HTMLInputElement)
          .checked
      ).toBe(false);
      expect(
        (screen.getByRole("checkbox", { name: /org_4/ }) as HTMLInputElement)
          .checked
      ).toBe(false);
    });
  });

  describe("fetching", () => {
    test("should eagerly fetch all subscription data", async () => {
      await renderComponent();

      expect(fetch).toHaveBeenCalledWith(
        `/api/v2/users/${props.user.id}/organization_subscriptions.json?page[size]=100`
      );

      expect(fetch).toHaveBeenCalledWith(
        `/api/v2/users/${props.user.id}/organization_subscriptions.json?page[size]=100&cursor=2`
      );
    });
  });

  describe("subscribing", () => {
    describe("when the request fails", () => {
      test("it renders the error messages", async () => {
        await renderComponent();

        fireEvent.click(screen.getByRole("checkbox", { name: /org_4/ }));
        fireEvent.click(screen.getByText("Save"));
        await act(() => Promise.resolve());
        expect(
          screen.getByText("Give it a moment and try again")
        ).toBeDefined();
        expect(
          screen.getAllByText("Organization subscription could not be saved")[0]
        ).toBeDefined();
      });
    });

    describe("when the request is successful", () => {
      test("it sends the creation request", async () => {
        await renderComponent();

        fireEvent.click(screen.getByRole("checkbox", { name: /org_3/ }));
        fireEvent.click(screen.getByText("Save"));
        await act(() => Promise.resolve());

        expect(fetch).toHaveBeenCalledWith(
          "/api/v2/organization_subscriptions.json",
          {
            body: JSON.stringify({
              organization_subscription: {
                user_id: user.id,
                organization_id: 3,
              },
            }),
            method: "POST",
            headers: {
              "X-CSRF-Token": props.user.authenticity_token,
              "Content-Type": "application/json",
            },
          }
        );
      });

      test("it closes the modal", async () => {
        await renderComponent();

        fireEvent.click(screen.getByRole("checkbox", { name: /org_3/ }));
        fireEvent.click(screen.getByText("Save"));
        await act(() => Promise.resolve());

        expect(props.onClose).toHaveBeenCalled();
      });
    });
  });

  describe("unsubscribing", () => {
    describe("when the request fails", () => {
      test("it renders the error messages", async () => {
        await renderComponent();

        fireEvent.click(screen.getByRole("checkbox", { name: /org_4/ }));
        fireEvent.click(screen.getByText("Save"));
        await act(() => Promise.resolve());

        expect(
          screen.getByText("Give it a moment and try again")
        ).toBeDefined();
        expect(
          screen.getAllByText("Organization subscription could not be saved")[0]
        ).toBeDefined();
      });
    });

    describe("when successful", () => {
      beforeEach(async () => {
        await renderComponent();
        fireEvent.click(screen.getByRole("checkbox", { name: /org_2/ }));
        fireEvent.click(screen.getByText("Save"));
        await act(() => Promise.resolve());
      });

      test("it sends the deletion request", async () => {
        expect(fetch).toHaveBeenCalledWith(
          `/api/v2/organization_subscriptions/2.json`,
          {
            method: "DELETE",
            headers: {
              "X-CSRF-Token": props.user.authenticity_token,
            },
          }
        );
      });

      test("it closes the modal", async () => {
        expect(props.onClose).toHaveBeenCalled();
      });

      test("it calls notify", async () => {
        expect(notify).toHaveBeenCalled();
      });
    });
  });

  describe("no changes", () => {
    test("it closes the modal and doesn't call the subscription endpoint when Save clicked and nothing has changed", async () => {
      await renderComponent();
      expect(fetch).toHaveBeenCalledTimes(2);

      fireEvent.click(screen.getByText("Save"));
      await act(() => Promise.resolve());

      expect(props.onClose).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(notify).not.toHaveBeenCalled();
    });
  });

  test("loads off-page organizations, preserves checkbox changes, and saves only changed subscriptions", async () => {
    const originalFetch = global.fetch;
    const page = (ids: number[], next_page: string | null) => ({
      ok: true,
      json: async () => ({
        organizations: ids.map((id) => ({
          id,
          name: `org_${id}`,
          default: id === 1,
          view_tickets: true,
          inherited: false,
        })),
        next_page,
      }),
    });
    let pageAttempts = 0;
    global.fetch = jest.fn((url, options) => {
      if (url === "/api/v2/organizations/accessible")
        return Promise.resolve(
          page([1, 3], "/api/v2/organizations/accessible?page=2")
        ) as Promise<Response>;
      if (url === "/api/v2/organizations/accessible?page=2") {
        if (++pageAttempts === 1) return Promise.reject(new Error("network"));
        return Promise.resolve(page([7, 9], null)) as Promise<Response>;
      }
      return originalFetch(url, options);
    });
    const onClose = props.onClose;
    function PaginatedModal() {
      const {
        organizations,
        hasMore,
        isLoading,
        isLoadingMore,
        loadMore,
        error,
      } = useOrganizations(user);
      return isLoading ? null : (
        <FollowOrganizationsModal
          organizations={organizations}
          organizationPagination={{
            hasMore,
            isLoading: isLoadingMore,
            loadMore,
            error,
          }}
          user={user}
          onClose={onClose}
        />
      );
    }
    try {
      render(<PaginatedModal />);
      const org3 = await screen.findByRole("checkbox", { name: "org_3" });
      expect(
        screen.queryByRole("checkbox", { name: "org_7" })
      ).not.toBeInTheDocument();
      expect(fetch).not.toHaveBeenCalledWith(
        "/api/v2/organizations/accessible?page=2",
        expect.anything()
      );
      fireEvent.click(org3);
      fireEvent.click(screen.getByRole("link", { name: "Show more" }));
      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Give it a moment and try again"
      );
      expect(screen.getByRole("checkbox", { name: "org_3" })).toBeChecked();
      fireEvent.click(screen.getByRole("link", { name: "Show more" }));
      const org7 = await screen.findByRole("checkbox", { name: "org_7" });
      expect(org7).toBeChecked();
      expect(screen.getByRole("checkbox", { name: "org_3" })).toBeChecked();
      fireEvent.click(org7);
      fireEvent.click(screen.getByRole("checkbox", { name: "org_9" }));
      expect(
        screen.queryByRole("link", { name: "Show more" })
      ).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Save" }));
      await waitFor(() => expect(props.onClose).toHaveBeenCalled());
      const writes = (fetch as jest.Mock).mock.calls.filter(
        ([, options]) => options?.method
      );
      expect(writes).toHaveLength(3);
      expect(
        writes
          .filter(([, options]) => options.method === "POST")
          .map(
            ([, options]) =>
              JSON.parse(options.body).organization_subscription.organization_id
          )
      ).toEqual([3, 9]);
      expect(
        writes
          .filter(([, options]) => options.method === "DELETE")
          .map(([url]) => url)
      ).toEqual(["/api/v2/organization_subscriptions/3.json"]);
    } finally {
      global.fetch = originalFetch;
    }
  });
});
