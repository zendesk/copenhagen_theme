import { screen, waitFor, act, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ClarificationCommentForm from "../ClarificationCommentForm";
import { useSubmitComment } from "../hooks/useSubmitComment";
import { useGetClarificationCopy } from "../hooks/useGetClarificationCopy";
import { MAX_CHAR_COUNT, WARNING_THRESHOLD } from "../constants";
import { renderHook } from "@testing-library/react-hooks";
import { renderWithTheme } from "../../../../testHelpers";

jest.mock("../hooks/useSubmitComment");

describe("ClarificationCommentForm", () => {
  const mockMarkAllCommentsAsRead = jest.fn();

  const props = {
    baseLocale: "en-US",
    currentUserAvatarUrl: "https://example.com/avatar.png",
    currentUserName: "Jane Doe",
    markAllCommentsAsRead: mockMarkAllCommentsAsRead,
    approvalRequestId: "123",
    onUpdatedComments: jest.fn(),
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

    const avatar = screen.getByRole("img", { name: /jane doe/i });
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
    userEvent.click(textarea);
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

  it("calls handleSubmitComment when the submit button is clicked", async () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    const handleSubmitCommentMock = jest.fn(() =>
      Promise.resolve({ status: "success", data: "" })
    );
    (useSubmitComment as jest.Mock).mockReturnValue({
      status: "",
      submitComment: handleSubmitCommentMock,
    });

    renderWithTheme(<ClarificationCommentForm {...props} />);

    await userEvent.type(screen.getByRole("textbox"), "Test comment");
    const submitBtn = await screen.findByRole("button", {
      name: result.current.submit_button,
    });

    await act(async () => {
      await userEvent.click(submitBtn);
    });

    expect(handleSubmitCommentMock).toHaveBeenCalledWith("123", "Test comment");
  });

  it("calls onUpdatedComments with data when comment submission succeeds", async () => {
    const sampleData = [{ id: 1, message: "test reply" }];
    const handleSubmitMock = jest
      .fn()
      .mockResolvedValue({ success: true, data: sampleData });
    (useSubmitComment as jest.Mock).mockReturnValue({
      isLoading: false,
      submitComment: handleSubmitMock,
    });

    const onUpdatedCommentsMock = jest.fn();

    renderWithTheme(
      <ClarificationCommentForm
        {...props}
        onUpdatedComments={onUpdatedCommentsMock}
      />
    );

    await userEvent.type(screen.getByRole("textbox"), "Hello");

    const submitBtn = await screen.findByRole("button", { name: /send/i });
    await act(async () => {
      await userEvent.click(submitBtn);
    });

    expect(handleSubmitMock).toHaveBeenCalledWith("123", "Hello");
    expect(onUpdatedCommentsMock).toHaveBeenCalledWith(sampleData);
  });

  it("calls handleCancel when the cancel button is clicked", async () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    renderWithTheme(<ClarificationCommentForm {...props} />);
    const textarea = screen.getByRole("textbox");

    await userEvent.type(textarea, "Test comment");
    expect(screen.getByText("Test comment")).toBeInTheDocument();

    const cancelButton = screen.getByText(result.current.cancel_button);
    await act(async () => {
      await userEvent.click(cancelButton);
    });

    expect(screen.queryByText("Test comment")).not.toBeInTheDocument();
  });

  it("shows validation error when input is empty and submit is clicked", async () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    renderWithTheme(<ClarificationCommentForm {...props} />);

    // Focus textarea to trigger buttons rendering
    const textarea = screen.getByRole("textbox");

    userEvent.click(textarea);
    const sendButton = await screen.findByRole("button", {
      name: result.current.submit_button,
    });
    await userEvent.click(sendButton);
    expect(
      screen.getByText(result.current.validation_empty_input)
    ).toBeInTheDocument();
  });

  it("shows warning message when near max character limit", async () => {
    renderWithTheme(<ClarificationCommentForm {...props} />);

    const textarea = screen.getByRole("textbox");
    const nearMaxLengthText = "a".repeat(MAX_CHAR_COUNT - WARNING_THRESHOLD);

    // using fireEvent here because userEvent.type has issues with large text inputs
    fireEvent.change(textarea, { target: { value: nearMaxLengthText } });

    const warningMessage = screen.getByRole("alert");
    expect(warningMessage).toBeInTheDocument();

    expect(
      screen.getByText(`${WARNING_THRESHOLD} characters remaining`)
    ).toBeInTheDocument();
  });

  it("buttons show only when input is focused or has content", async () => {
    const { result } = renderHook(() => useGetClarificationCopy());

    renderWithTheme(<ClarificationCommentForm {...props} />);

    const textarea = screen.getByRole("textbox");

    // Initially buttons hidden
    expect(
      screen.queryByRole("button", { name: result.current.submit_button })
    ).not.toBeInTheDocument();

    userEvent.type(textarea, "Some text");

    expect(
      await screen.findByRole("button", { name: result.current.submit_button })
    ).toBeInTheDocument();
  });

  it("prevents typing beyond max length", () => {
    renderWithTheme(<ClarificationCommentForm {...props} />);

    const textarea = screen.getByRole("textbox");

    const longText = "a".repeat(MAX_CHAR_COUNT + 10);
    // using fireEvent here because userEvent.type has issues with large text inputs
    fireEvent.change(textarea, { target: { value: longText } });
    expect(textarea).toHaveValue(longText.slice(0, MAX_CHAR_COUNT));
  });
});
