import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { GenerativeAnswerBotModal } from "./GenerativeAnswerBotModal";
import * as shared from "../../shared";
import * as csrfToken from "../fetchCsrfToken";
import { FeedbackType } from "../data-types";

// Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue || key,
  }),
}));

jest.mock("@zendeskgarden/svg-icons/src/12/sparkle-fill.svg", () => {
  const SvgrMock = () => <span />;
  SvgrMock.displayName = "SvgrMock";
  return {
    __esModule: true,
    default: SvgrMock,
  };
});

const mockModalContainer = document.createElement("div");
mockModalContainer.id = "modal-container";
document.body.appendChild(mockModalContainer);

jest.mock("../../shared", () => ({
  ...jest.requireActual("../../shared"),
  useModalContainer: () => mockModalContainer,
  addFlashNotification: jest.fn(),
}));

// Mock fetchCsrfToken
jest.mock("../fetchCsrfToken", () => ({
  fetchCsrfToken: jest.fn(),
}));

const mockRequestId = 123;
const mockRedirectTo = "/hc/en-us/requests";
const mockAuthToken = "test-auth-token";

const mockGenerativeResponse = {
  generated_answer: "This is a generated answer.",
  citations: [
    {
      article_id: 123,
      title: "How to get help",
      html_url: "https://example.zendesk.com/hc/en-us/articles/123",
    },
    {
      article_id: 456,
      title: "Troubleshooting guide",
      html_url: "https://example.zendesk.com/hc/en-us/articles/456",
    },
  ],
  ticket_deflection: {
    auth_token: mockAuthToken,
  },
};

const renderWithMock = (mock = mockGenerativeResponse) => {
  // Mock fetch
  global.fetch = jest.fn((url) => {
    if (url.toString().includes("generate_reply")) {
      return Promise.resolve({
        json: () => Promise.resolve(mock),
        ok: true,
      });
    }
    if (url.toString().includes("generative_deflection")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    }
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({}),
    });
  }) as jest.Mock;

  render(
    <ThemeProvider theme={DEFAULT_THEME}>
      <GenerativeAnswerBotModal
        requestId={mockRequestId}
        redirectTo={mockRedirectTo}
      />
    </ThemeProvider>
  );
};

describe("GenerativeAnswerBotModal", () => {
  beforeEach(() => {
    // Mock window.location.href
    Object.defineProperty(window, "location", {
      value: {
        href: "",
      },
      writable: true,
    });

    // Reset mocks
    jest.clearAllMocks();

    // Mock CSRF token
    (csrfToken.fetchCsrfToken as jest.Mock).mockResolvedValue("csrf-token");
  });

  test("user gets a reply, finds it helpful, and closes the request", async () => {
    renderWithMock();

    // Wait for the generative reply to be displayed
    expect(
      await screen.findByText("This is a generated answer.")
    ).toBeVisible();

    // Wait for the modal to update to the success state
    expect(
      await screen.findByText("This helped, solve my request")
    ).toBeVisible();

    // User clicks "This helped, solve my request"
    const closeRequestButton = document.getElementById(
      "ab-generative-modal-resolve-button"
    );
    expect(closeRequestButton).toBeVisible();
    if (!closeRequestButton) throw new Error("Button not found");
    await userEvent.click(closeRequestButton);

    // Assert that the feedback was sent
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `/api/v2/answer_bot/generative_deflection/${FeedbackType.POSITIVE}?auth_token=${mockAuthToken}`,
        expect.any(Object)
      );
    });

    // Assert that the flash message is shown and redirection happens
    await waitFor(() => {
      expect(shared.addFlashNotification).toHaveBeenCalledWith({
        type: "success",
        message: "Your request has been solved",
      });
      expect(window.location.href).toBe(mockRedirectTo);
    });
  });

  test("user gets a reply, doesn't find it helpful", async () => {
    renderWithMock();

    // Wait for the generative reply to be displayed
    expect(
      await screen.findByText("This is a generated answer.")
    ).toBeVisible();

    // User clicks "Still need help"
    const stillNeedHelpButton = document.getElementById(
      "ab-generative-modal-reject-button"
    );
    expect(stillNeedHelpButton).toBeVisible();
    if (!stillNeedHelpButton) throw new Error("Button not found");
    await userEvent.click(stillNeedHelpButton);

    // Assert that negative feedback was sent
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `/api/v2/answer_bot/generative_deflection/${FeedbackType.NEGATIVE}?auth_token=${mockAuthToken}`,
        expect.any(Object)
      );
    });

    // Assert that the flash message is shown and redirection happens
    await waitFor(() => {
      expect(shared.addFlashNotification).toHaveBeenCalledWith({
        type: "success",
        message: "Your request was successfully submitted",
      });
      expect(window.location.href).toBe(mockRedirectTo);
    });
  });

  test("user gets a reply and checks sources", async () => {
    renderWithMock();

    // Wait for the generative reply to be displayed
    expect(
      await screen.findByText("This is a generated answer.")
    ).toBeVisible();

    // User clicks "View Sources"
    const viewSourcesButton = document.getElementById(
      "ab-generative-modal-show-sources-button"
    );
    expect(viewSourcesButton).toBeVisible();
    if (!viewSourcesButton) throw new Error("Button not found");
    await userEvent.click(viewSourcesButton);

    // Verify that citations are now visible
    expect(
      await screen.findByText(
        "This message was automatically generated using AI and the following article sources:"
      )
    ).toBeVisible();

    // Check that citation links are displayed
    expect(screen.getByText("How to get help")).toBeVisible();
    expect(screen.getByText("Troubleshooting guide")).toBeVisible();

    // Verify the links have correct URLs
    const helpLink = screen.getByRole("link", { name: "How to get help" });
    expect(helpLink).toHaveAttribute(
      "href",
      "https://example.zendesk.com/hc/en-us/articles/123"
    );

    const troubleshootingLink = screen.getByRole("link", {
      name: "Troubleshooting guide",
    });
    expect(troubleshootingLink).toHaveAttribute(
      "href",
      "https://example.zendesk.com/hc/en-us/articles/456"
    );

    // Verify that links open in new tab
    expect(helpLink).toHaveAttribute("target", "_blank");
    expect(troubleshootingLink).toHaveAttribute("target", "_blank");
  });

  test("user doesn't get a reply so the error screen is shown", async () => {
    renderWithMock({ ...mockGenerativeResponse, generated_answer: "" });

    // Wait for the modal to show the error state due to empty response
    expect(
      await screen.findByText("An agent will be in touch soon")
    ).toBeVisible();

    // Verify that the error description is shown
    expect(
      screen.getByText(
        "The AI wasn’t able to find an answer this time. Don't worry, a human agent will get back to you by email shortly."
      )
    ).toBeVisible();

    // User clicks "Ok" to close the modal
    const okButton = screen.getByRole("button", { name: "Ok" });
    await userEvent.click(okButton);

    // Assert that the flash message is shown and redirection happens
    await waitFor(() => {
      expect(shared.addFlashNotification).toHaveBeenCalledWith({
        type: "success",
        message: "Your request was successfully submitted",
      });
      expect(window.location.href).toBe(mockRedirectTo);
    });
  });
});
