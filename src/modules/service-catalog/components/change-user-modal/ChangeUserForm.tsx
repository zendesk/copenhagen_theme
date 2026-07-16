import type React from "react";
import { useCallback, useRef, useState } from "react";
import { Modal } from "@zendeskgarden/react-modals";
import styled from "styled-components";
import { getColor } from "@zendeskgarden/react-theming";
import { Button } from "@zendeskgarden/react-buttons";
import { useTranslation } from "react-i18next";
import type { IComboboxProps } from "@zendeskgarden/react-dropdowns";
import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";
import { Span } from "@zendeskgarden/react-typography";
import UserCircleStrokeIcon from "@zendeskgarden/svg-icons/src/16/user-circle-stroke.svg";
import type { UserOption } from "../../data-types/UserOption";
import { useUserSearch } from "../../hooks/useUserSearch";

interface ChangeUserFormProps {
  onCancel: () => void;
  onCreate: (userName: string, userId: string | null) => Promise<void> | void;
  selectedUser: UserOption | null;
  setSelectedUser: (user: UserOption | null) => void;
}

const StyledHeader = styled(Modal.Header)`
  color: ${({ theme }) => getColor({ theme, hue: "successHue", shade: 700 })};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;

const StyledModalBody = styled(Modal.Body)`
  padding-bottom: 48px;
`;

const StyledOption = styled(Option)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.space.sm};
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.space.sm};
`;

const StyledContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.xs};
`;

const StyledOptionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledModalFooter = styled(Modal.Footer)`
  padding: 32px 40px;
  border-top: 1px solid rgb(232, 234, 236);
`;

export const ChangeUserForm: React.FC<ChangeUserFormProps> = ({
  onCancel,
  onCreate,
  selectedUser,
  setSelectedUser,
}) => {
  const { t } = useTranslation();
  const [userError, setUserError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>(
    selectedUser?.name ?? ""
  );
  const [isCreating, setIsCreating] = useState(false);
  const isTyping = useRef<boolean>(false);

  const { options, isLoadingOptions, searchUsers, clearOptions } =
    useUserSearch(selectedUser, () => {
      isTyping.current = false;
    });

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <strong>{match}</strong>
        {after}
      </>
    );
  };

  const loadingOption: UserOption = {
    id: "loading",
    name: t(
      "service-catalog.change-user-modal.loading-users",
      "Loading users..."
    ),
    email: "",
  };

  const noResultsOption: UserOption = {
    id: "no-results",
    name: t(
      "service-catalog.change-user-modal.no-matches-found",
      "Type to search"
    ),
    email: "",
  };

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    ({ inputValue, selectionValue }) => {
      if (selectionValue !== undefined) {
        const selectedOption = options.find((opt) => opt.id === selectionValue);

        if (
          selectedOption &&
          selectedOption.id !== "loading" &&
          selectedOption.id !== "no-results"
        ) {
          setSelectedUser(selectedOption);
          setInputValue(selectedOption.name);
          setUserError(false);
          isTyping.current = false;
        }
      }

      if (inputValue !== undefined) {
        setInputValue(inputValue);
        isTyping.current = true; // Mark as typing

        if (inputValue.trim().length >= 3) {
          searchUsers(inputValue.trim());
        } else {
          clearOptions();
          setSelectedUser(null);
          isTyping.current = false;
        }
      }
    },
    [options, searchUsers, clearOptions, setSelectedUser]
  );

  const handleCreate = async () => {
    if (!selectedUser) {
      setUserError(true);
      return;
    }
    setIsCreating(true);
    try {
      await onCreate(selectedUser.name, selectedUser.id);
    } catch (error) {
      console.error("Error changing user:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const setSelectedUserFromInput = useCallback(() => {
    if (!inputValue.trim()) {
      if (selectedUser) {
        setSelectedUser(null);
        setUserError(false);
      }
      return;
    }

    if (
      selectedUser &&
      (selectedUser.name.toLowerCase() === inputValue.toLowerCase() ||
        selectedUser.email.toLowerCase() === inputValue.toLowerCase())
    ) {
      return;
    }

    const match = options.find(
      (opt) => opt.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (match) {
      setSelectedUser(match);
      setInputValue(match.name);
      setUserError(false);
    }
  }, [inputValue, options, selectedUser]);

  const handleBlur = useCallback(() => {
    if (!isTyping.current) {
      setSelectedUserFromInput();
    }
  }, [setSelectedUserFromInput]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !isTyping.current && !isLoadingOptions) {
        setSelectedUserFromInput();
        // Combobox will close automatically on Enter
      }
    },
    [isLoadingOptions, setSelectedUserFromInput]
  );

  const displayOptions = isLoadingOptions
    ? [loadingOption]
    : options.length === 0
    ? [noResultsOption] // Show "No results" when no options (whether typed or not)
    : options;

  return (
    <>
      <StyledHeader tag="h2">
        {t(
          "service-catalog.change-user-modal.requester-title",
          "Change requester"
        )}
      </StyledHeader>

      <StyledModalBody>
        <FormContainer>
          <>
            <Field>
              <Field.Label>
                {t(
                  "service-catalog.change-user-modal.select-requester-label",
                  "Select requester* (required)"
                )}
              </Field.Label>
              <Combobox
                ref={inputRef}
                inputValue={inputValue}
                selectionValue={selectedUser?.id}
                onChange={handleChange}
                validation={userError ? "error" : undefined}
                data-test-id="user-autocomplete-input"
                isAutocomplete
                placeholder={t(
                  "service-catalog.change-user-modal.requester-search-placeholder",
                  "Search requesters..."
                )}
                renderValue={() => selectedUser?.name || ""}
                inputProps={{
                  onBlur: handleBlur,
                  onKeyDown: handleKeyDown,
                }}
              >
                {displayOptions.length > 0
                  ? displayOptions.map((option) => (
                      <StyledOption
                        key={option.id}
                        value={option.id}
                        label={option.name}
                        isDisabled={
                          option.id === "loading" || option.id === "no-results"
                        }
                      >
                        {option.email ? (
                          <StyledContainer>
                            <UserCircleStrokeIcon />
                            <StyledOptionContent>
                              <span>
                                {highlightMatch(option.name, inputValue)}
                              </span>
                              <Option.Meta>
                                <Span hue="grey">{option.email}</Span>
                              </Option.Meta>
                            </StyledOptionContent>
                          </StyledContainer>
                        ) : (
                          <OptionContent>
                            <span>{option.name}</span>
                          </OptionContent>
                        )}
                      </StyledOption>
                    ))
                  : null}
              </Combobox>
              {userError && (
                <Field.Message
                  validation="error"
                  validationLabel={t(
                    "service-catalog.validation.error.aria.label",
                    "Error"
                  )}
                >
                  {t(
                    "service-catalog.change-user-modal.requester-required",
                    "Select a requester"
                  )}
                </Field.Message>
              )}
            </Field>
          </>
        </FormContainer>
      </StyledModalBody>
      <StyledModalFooter>
        <Modal.FooterItem>
          <Button onClick={onCancel} isBasic data-test-id="cancel-button">
            {t("service-catalog.change-user-modal.cancel", "Cancel")}
          </Button>
        </Modal.FooterItem>
        <Modal.FooterItem>
          <Button
            isPrimary
            onClick={handleCreate}
            disabled={isCreating || !selectedUser}
            data-test-id="change-user-button"
          >
            {t("service-catalog.change-user-modal.change-user", "Save")}
          </Button>
        </Modal.FooterItem>
      </StyledModalFooter>
    </>
  );
};
