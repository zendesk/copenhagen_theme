jest.mock("../../../../shared/notifications/notify");

import { act, fireEvent, screen } from "@testing-library/react";
import FollowOrganizationsModal from "./FollowOrganizationsModal";
import { render } from "../../../../test/render";
import type { User } from "../../../data-types";
import { notify } from "../../../../shared";

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
});
