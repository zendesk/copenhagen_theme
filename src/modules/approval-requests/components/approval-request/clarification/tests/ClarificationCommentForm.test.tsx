import { screen, fireEvent, waitFor } from "@testing-library/react";
import ClarificationCommentForm from "../ClarificationCommentForm";
import { useSubmitComment } from "../hooks/useSubmitComment";
import { useGetClarificationCopy } from "../hooks/useGetClarificationCopy";
import { MAX_CHAR_COUNT, WARNING_THRESHOLD } from "../constants";
import { renderHook } from "@testing-library/react-hooks";
import { type CurrentUser } from "../../../../hooks/useCurrentUser";
import { renderWithTheme } from "../../../../testHelpers";

jest.mock("../../../../hooks/useCurrentUser", () => ({
  useCurrentUser: jest.fn(),
}));

jest.mock("../hooks/useSubmitComment");

jest.mock(
  "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg",
  () => "svg-mock"
);

describe("ClarificationCommentForm", () => {
  const mockMarkAllCommentsAsRead = jest.fn();
  const mockCurrentUser: CurrentUser = {
    id: "123",
    name: "Test User",
    avatar: "https://example.com/avatar.png",
    email: "user@example.com",
    role: "agent",
  } as unknown as CurrentUser;

  const props = {
    baseLocale: "en-US",
    currentUser: mockCurrentUser,
    markAllCommentsAsRead: mockMarkAllCommentsAsRead,
  };

  beforeEach(() => {
    (useSubmitComment as jest.Mock).mockReturnValue({
      status: "",
      handleSubmitComment: jest.fn(),
    });
  });

  it("renders the form with a textarea and hidden buttons", () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    renderWithTheme(<ClarificationCommentForm {...props} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // Buttons are hidden initially
    expect(
      screen.queryByText(result.current.submit_button)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(result.current.cancel_button)
    ).not.toBeInTheDocument();
  });

  it("displays the user avatar", () => {
    renderWithTheme(<ClarificationCommentForm {...props} />);

    const avatar = screen.getByRole("img", { name: /avatar/i });
    expect(avatar).toBeInTheDocument();
  });

  it("disables buttons when the form is submitting", async () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    (useSubmitComment as jest.Mock).mockReturnValue({
      isLoading: true,
      handleSubmitComment: jest.fn(),
    });

    renderWithTheme(<ClarificationCommentForm {...props} />);

    // Focus textarea to trigger buttons rendering
    const textarea = screen.getByRole("textbox");
    fireEvent.focus(textarea);
    fireEvent.click(textarea);
    await waitFor(async () => {
      const submitBtn = await screen.findByRole("button", {
        name: result.current.submit_button,
      });
      const cancelBtn = await screen.findByRole("button", {
        name: result.current.cancel_button,
      });

      expect(submitBtn).toBeDisabled();
      expect(cancelBtn).toBeDisabled();
    });
  });

  it("calls handleSubmitComment when the submit button is clicked", () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    const handleSubmitCommentMock = jest.fn(() =>
      Promise.resolve({ status: "success", data: "" })
    );
    (useSubmitComment as jest.Mock).mockReturnValue({
      status: "",
      handleSubmitComment: handleSubmitCommentMock,
    });

    renderWithTheme(<ClarificationCommentForm {...props} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Test comment" },
    });
    fireEvent.click(screen.getByText(result.current.submit_button));

    expect(handleSubmitCommentMock).toHaveBeenCalledWith("Test comment");
  });

  it("calls handleCancel when the cancel button is clicked", () => {
    const { result } = renderHook(() => useGetClarificationCopy());

    renderWithTheme(<ClarificationCommentForm {...props} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Test comment" },
    });

    expect(screen.getByText("Test comment")).toBeInTheDocument();
    fireEvent.click(screen.getByText(result.current.cancel_button));

    expect(screen.queryByText("Test comment")).not.toBeInTheDocument();
  });

  it("shows validation error when input is empty and submit is clicked", async () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    renderWithTheme(<ClarificationCommentForm {...props} />);

    // Focus textarea to trigger buttons rendering
    const textarea = screen.getByRole("textbox");

    fireEvent.focus(textarea);
    fireEvent.click(textarea);
    const sendButton = await screen.findByRole("button", {
      name: result.current.submit_button,
    });
    fireEvent.click(sendButton);
    expect(
      screen.getByText(result.current.validation_empty_input)
    ).toBeInTheDocument();
  });

  it("shows warning message when near max character limit", () => {
    renderWithTheme(<ClarificationCommentForm {...props} />);

    const textarea = screen.getByRole("textbox");
    const nearMaxLengthText = "a".repeat(MAX_CHAR_COUNT - WARNING_THRESHOLD);

    fireEvent.change(textarea, { target: { value: nearMaxLengthText } });

    const warningMessage = screen.getByRole("alert");
    expect(warningMessage).toBeInTheDocument();

    // expect(
    //   screen.getByText(`${WARNING_THRESHOLD} characters remaining`)
    // ).toBeInTheDocument();
  });

  it("buttons show only when input is focused or has content", async () => {
    const { result } = renderHook(() => useGetClarificationCopy());

    renderWithTheme(<ClarificationCommentForm {...props} />);

    const textarea = screen.getByRole("textbox");

    // Initially buttons hidden
    expect(
      screen.queryByRole("button", { name: result.current.submit_button })
    ).not.toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: "Some text" } });

    expect(
      await screen.findByRole("button", { name: result.current.submit_button })
    ).toBeInTheDocument();
  });

  it("prevents typing beyond max length", () => {
    renderWithTheme(<ClarificationCommentForm {...props} />);

    const textarea = screen.getByRole("textbox");

    const longText = "a".repeat(MAX_CHAR_COUNT + 10);
    fireEvent.change(textarea, { target: { value: longText } });

    expect(textarea).toHaveValue(longText.slice(0, MAX_CHAR_COUNT));
  });
});
