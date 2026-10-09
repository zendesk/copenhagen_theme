import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import {
  isUserLookupField,
  USER_RELATIONSHIP_TARGET,
  UserLookupField,
} from "./UserLookupField";
import { render } from "../../test/render";

describe("isUserLookupField", () => {
  it("returns true for lookup fields targeting zen:user", () => {
    expect(
      isUserLookupField({
        type: "lookup",
        relationship_target_type: USER_RELATIONSHIP_TARGET,
      })
    ).toBe(true);
  });

  it("returns false for custom object lookups", () => {
    expect(
      isUserLookupField({
        type: "lookup",
        relationship_target_type: "zen:custom_object:apartment",
      })
    ).toBe(false);
  });

  it("returns false for non-lookup fields", () => {
    expect(
      isUserLookupField({
        type: "text",
        relationship_target_type: USER_RELATIONSHIP_TARGET,
      })
    ).toBe(false);
  });
});

const userA = { id: "1", name: "Alice", email: "alice@example.com" };
const userB = { id: "2", name: "Bob", email: "bob@example.com" };

const defaultField: TicketFieldObject = {
  id: 100,
  name: "request[custom_fields][100]",
  value: "",
  error: null,
  label: "Assignee",
  required: false,
  description: "",
  type: "lookup",
  options: [],
  relationship_target_type: USER_RELATIONSHIP_TARGET,
};

const usersSearchResponse = (users: (typeof userA)[]) => ({
  ok: true,
  json: () => Promise.resolve({ users }),
});

const userShowResponse = (user: {
  id: string;
  name: string;
  email: string;
}) => ({
  ok: true,
  json: () => Promise.resolve({ user }),
});

describe("UserLookupField", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("does not search until the minimum query length is reached, then debounces", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(usersSearchResponse([userA])) as jest.Mock;
    global.fetch = fetchMock;

    render(<UserLookupField field={defaultField} onChange={jest.fn()} />);
    const combobox = screen.getByLabelText("Assignee");

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "al" } });
    });
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "ali" } });
    });
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("query=ali"),
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it("aborts the in-flight request when the query drops below the minimum length", async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");
    // Never resolves on its own: the request is still "in flight" when the
    // query drops below the minimum length, which is the scenario the fix
    // guards against (a late response overwriting cleared results).
    let capturedSignal: AbortSignal | undefined;
    global.fetch = jest.fn(
      (_url: string, options?: { signal: AbortSignal }) => {
        capturedSignal = options?.signal;
        return new Promise(() => {});
      }
    ) as unknown as jest.Mock;

    render(<UserLookupField field={defaultField} onChange={jest.fn()} />);
    const combobox = screen.getByLabelText("Assignee");

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "ali" } });
    });
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Loading items...")).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "a" } });
    });
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(abortSpy).toHaveBeenCalled();
    expect(capturedSignal?.aborted).toBe(true);
    // Dropping below the minimum must not trigger another search.
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Loading items...")).not.toBeInTheDocument();
    abortSpy.mockRestore();
  });

  it("selects a user from the results and calls onChange with the id", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(usersSearchResponse([userA, userB])) as jest.Mock;
    global.fetch = fetchMock;
    const onChange = jest.fn();

    render(<UserLookupField field={defaultField} onChange={onChange} />);
    const combobox = screen.getByLabelText("Assignee");

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "ali" } });
      jest.advanceTimersByTime(300);
    });

    const option = await screen.findByText("Alice (alice@example.com)");
    await act(async () => {
      fireEvent.click(option);
    });

    expect(onChange).toHaveBeenCalledWith("1");
    // Garden/downshift sends both selectionValue and inputValue (the option's
    // label) on selection; the displayed value must stay the user's name, not
    // the "name (email)" label, and selecting must not trigger another search.
    expect(combobox).toHaveValue("Alice");
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("clears the selection via the '-' option and calls onChange with an empty value", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(usersSearchResponse([userA])) as jest.Mock;
    const onChange = jest.fn();

    render(<UserLookupField field={defaultField} onChange={onChange} />);
    const combobox = screen.getByLabelText("Assignee");

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "ali" } });
      jest.advanceTimersByTime(300);
    });
    const option = await screen.findByText("Alice (alice@example.com)");
    await act(async () => {
      fireEvent.click(option);
    });
    expect(onChange).toHaveBeenCalledWith("1");

    await act(async () => {
      fireEvent.click(combobox);
    });
    const emptyOption = await screen.findByText("-");
    await act(async () => {
      fireEvent.click(emptyOption);
    });

    expect(onChange).toHaveBeenLastCalledWith("");
  });

  it("fetches and displays the name for an initial value", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(userShowResponse(userA)) as jest.Mock;

    render(
      <UserLookupField
        field={{ ...defaultField, value: "1" }}
        onChange={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/v2/users/1.json");
    });
    expect(await screen.findByLabelText("Assignee")).toHaveValue("Alice");
  });

  it("falls back to '-' when the initial value's user can't be read (e.g. 403)", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false }) as jest.Mock;

    render(
      <UserLookupField
        field={{ ...defaultField, value: "1" }}
        onChange={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/v2/users/1.json");
    });
    expect(await screen.findByLabelText("Assignee")).toHaveValue("-");
  });

  it("submits the selected user id via a hidden input in a native form", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(usersSearchResponse([userA])) as jest.Mock;

    const { container } = render(
      <form data-testid="form">
        <UserLookupField field={defaultField} onChange={jest.fn()} />
      </form>
    );
    const combobox = screen.getByLabelText("Assignee");

    const hiddenInput = container.querySelector(
      `input[type="hidden"][name="${defaultField.name}"]`
    ) as HTMLInputElement;
    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput.value).toBe("");

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "ali" } });
      jest.advanceTimersByTime(300);
    });
    const option = await screen.findByText("Alice (alice@example.com)");
    await act(async () => {
      fireEvent.click(option);
    });

    expect(hiddenInput.value).toBe("1");
    // The visible combobox input must not carry the field name, otherwise a
    // native form POST would submit the displayed label instead of the id.
    expect(combobox).not.toHaveAttribute("name", defaultField.name);
  });
});
