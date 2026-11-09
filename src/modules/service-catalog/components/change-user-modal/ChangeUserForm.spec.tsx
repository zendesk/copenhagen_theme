import {
  act,
  configure,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import debounce from "lodash.debounce";
import { ChangeUserModal } from "./index";
import { useUserSearch } from "../../../ticket-fields/hooks/useUserSearch";
import { render } from "../../../test/render";
import type { UserOption } from "../../../ticket-fields/data-types/UserOption";

jest.mock("../../../ticket-fields/hooks/useUserSearch");

configure({ testIdAttribute: "data-test-id" });

const mockUseUserSearch = useUserSearch as jest.MockedFunction<
  typeof useUserSearch
>;

const userA = { id: "1", name: "Alice Archer", email: "alice@example.com" };
const userB = { id: "2", name: "Bob Brown", email: "bob@example.com" };

const renderModal = ({
  selectedUser = null,
}: { selectedUser?: UserOption | null } = {}) => {
  const handlers = {
    setSelectedUser: jest.fn(),
    onCreate: jest.fn(),
    onClose: jest.fn(),
  };
  render(
    <ChangeUserModal
      onClose={handlers.onClose}
      onCreate={handlers.onCreate}
      selectedUser={selectedUser}
      setSelectedUser={handlers.setSelectedUser}
    />
  );
  return handlers;
};

const getComboboxInput = () =>
  screen.getByLabelText("Select requester* (required)");

describe("ChangeUserForm", () => {
  beforeEach(() => {
    mockUseUserSearch.mockReturnValue({
      options: [userA, userB],
      isLoadingOptions: false,
      searchUsers: debounce(jest.fn()),
      clearOptions: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const pickBob = async () => {
    await act(async () => {
      fireEvent.change(getComboboxInput(), {
        target: { value: "Bob" },
      });
    });
    const options = await screen.findAllByRole("option");
    const option = options.find((o) => o.textContent?.startsWith("Bob Brown"));
    if (!option) throw new Error("Bob Brown option not rendered");
    await act(async () => {
      fireEvent.click(option);
    });
  };

  it("keeps the picked user local until Save commits it", async () => {
    const { setSelectedUser, onCreate } = renderModal();

    await pickBob();

    expect(setSelectedUser).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("change-user-button"));

    await waitFor(() => {
      expect(setSelectedUser).toHaveBeenCalledWith(userB);
      expect(onCreate).toHaveBeenCalledWith("Bob Brown", "2");
    });
  });

  it("discards the picked user on Cancel", async () => {
    const { setSelectedUser, onCreate, onClose } = renderModal();

    await pickBob();

    fireEvent.click(screen.getByTestId("cancel-button"));

    expect(onClose).toHaveBeenCalled();
    expect(setSelectedUser).not.toHaveBeenCalled();
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("seeds the draft from the saved requester and never clears it directly", async () => {
    const { setSelectedUser } = renderModal({ selectedUser: userA });

    expect(getComboboxInput()).toHaveValue("Alice Archer");

    fireEvent.change(getComboboxInput(), {
      target: { value: "" },
    });

    expect(setSelectedUser).not.toHaveBeenCalled();
  });
});
