import { useEffect, useMemo, useState } from "react";
import { type IOptionProps } from "@zendeskgarden/react-dropdowns.next";
import type { TicketFieldOptionObject } from "../data-types/TicketFieldObject";
import { useTranslation } from "react-i18next";

interface OptionProps {
  value: string;
  label: string;
  /**
   * Optional label to be displayed in the menu instead of the full label
   */
  menuLabel?: string;
  type?: IOptionProps["type"];
}

interface RootGroup {
  type: "RootGroup";
  options: OptionProps[];
}

interface SubGroup {
  type: "SubGroup";
  backOption: OptionProps;
  name: string;
  options: OptionProps[];
}

type OptionGroup = RootGroup | SubGroup;

/**
 * Each group is identified by a string in the format of [level1::level2::level3].
 * The identifier is used as a key in the nested options object, and as a value
 * in the combobox options used to navigate between different levels.
 * The square brackets are used to distinguish between group identifiers and option values,
 * since they are not allowed as characters in an option value.
 */
type GroupIdentifier = `[${string}]`;

/**
 * The root group is identified by an empty string, to avoid possible clashes with a level with
 * a "Root" name.
 */
const ROOT_GROUP_IDENTIFIER = "[]" satisfies GroupIdentifier;

interface NestedOptions {
  [ROOT_GROUP_IDENTIFIER]: RootGroup;
  [key: string]: OptionGroup;
}

function getGroupIdentifier(names: string[]): GroupIdentifier {
  return `[${names.join("::")}]`;
}

function isGroupIdentifier(name: string): name is GroupIdentifier {
  return name.startsWith("[") && name.endsWith("]");
}

function getGroupAndOptionNames(
  input: string
): [groupNames: string[], optionName: string] {
  const namesList = input.split("::");
  return [namesList.slice(0, -1), namesList.slice(-1)[0]!];
}

function buildSubGroupOptions(
  groupNames: string[],
  backLabel: string
): SubGroup {
  const parentGroupNames = groupNames.slice(0, -1);
  const parentGroupIdentifier = getGroupIdentifier(parentGroupNames);
  const name = groupNames[groupNames.length - 1] as string;
  return {
    type: "SubGroup",
    name,
    backOption: {
      type: "previous",
      label: backLabel,
      value: parentGroupIdentifier,
    },
    options: [],
  };
}

/**
 * Maps a flat list of options to a nested structure
 *
 * For example, given the following options:
 * [
 *  { "name": "Bass::Fender::Precision", "value": "bass__fender__precision" },
 *  { "name": "Bass::Fender::Jazz", "value": "bass__fender__jazz" }
 *  { "name": "Drums", "value": "drums" },
 * ]
 *
 * The following nested structure will be returned:
 * {
 *  "[]": {
 *   "type": "RootGroup",
 *   "options": [
 *    { "label": "Bass", "value": "[Bass]", type: "next" },
 *    { "label": "Drums", "value": "drums" },
 *   ]
 *  },
 *  "[Bass]": {
 *   "type": "SubGroup",
 *   "name": "Bass",
 *   "backOption": { "type": "previous", "label": "Back", "value": "[]" },
 *   "options": [
 *    { "label": "Fender", "value": "[Bass::Fender]", type: "next" },
 *   ]
 *  },
 *  "[Bass::Fender]": {
 *   "type": "SubGroup",
 *   "name": "Fender",
 *   "backOption": { "type": "previous", "label": "Back", "value": "[Bass]" },
 *   "options": [
 *    { "menuLabel": "Precision", "label": "Bass > Fender > Precision", "value": "bass__fender__precision" },
 *    { "menuLabel": "Jazz", "label": "Bass > Fender > Jazz", "value": "bass__fender__jazz" },
 *   ]
 *  }
 * }
 *
 * @param options original field options
 * @param hasEmptyOption if true, adds an empty option to the root group
 * @returns nested options
 */
function buildNestedOptions(
  options: TicketFieldOptionObject[],
  hasEmptyOption: boolean,
  backLabel: string
): NestedOptions {
  const result: NestedOptions = {
    [ROOT_GROUP_IDENTIFIER]: {
      type: "RootGroup",
      options: hasEmptyOption ? [{ label: "-", value: "" }] : [],
    },
  };

  options.forEach((option) => {
    const { name, value } = option;

    if (!name.includes("::")) {
      result[ROOT_GROUP_IDENTIFIER].options.push({
        value,
        label: name,
      });
    } else {
      const [groupNames, optionName] = getGroupAndOptionNames(name);
      const groupIdentifier = getGroupIdentifier(groupNames);

      if (!result[groupIdentifier]) {
        result[groupIdentifier] = buildSubGroupOptions(groupNames, backLabel);
      }

      result[groupIdentifier]?.options.push({
        value,
        label: name.split("::").join(" > "),
        menuLabel: optionName,
      });

      // creates next options for each parent group, if they don't already exists
      for (let i = 0; i < groupNames.length; i++) {
        const parentGroupNames = groupNames.slice(0, i);
        const nextGroupNames = groupNames.slice(0, i + 1);
        const parentGroupIdentifier = getGroupIdentifier(parentGroupNames);
        const nextGroupIdentifier = getGroupIdentifier(nextGroupNames);

        if (!result[parentGroupIdentifier]) {
          result[parentGroupIdentifier] = buildSubGroupOptions(
            parentGroupNames,
            backLabel
          );
        }

        if (
          result[parentGroupIdentifier]?.options.find(
            (o) => o.value === nextGroupIdentifier
          ) === undefined
        ) {
          result[parentGroupIdentifier]?.options.push({
            type: "next",
            label: nextGroupNames[nextGroupNames.length - 1]!,
            value: nextGroupIdentifier,
          });
        }
      }
    }
  });

  return result;
}

/**
 * When one or more options are selected, the Combobox component renders the label
 * for an option in the input, searching for an option passed as a child with the
 * same value as the selected option.
 *
 * In the first render we are passing only the root group options as children,
 * and if we already have some selected values from a SubGroup, the component is not
 * able to find the label for the selected option.
 *
 * We therefore need to pass all the non-navigation options as children in the first render.
 * The passed options are cached by the Combobox component, so we can safely remove them
 * after the first render and pass only the root group options.
 */
function getInitialGroup(nestedOptions: NestedOptions): RootGroup {
  const result: RootGroup = {
    type: "RootGroup",
    options: [],
  };

  Object.values(nestedOptions).forEach(({ options }) => {
    result.options.push(...options.filter(({ type }) => type === undefined));
  });

  return result;
}

interface UseNestedOptionsProps {
  options: TicketFieldOptionObject[];
  hasEmptyOption: boolean;
}

export function useNestedOptions({
  options,
  hasEmptyOption,
}: UseNestedOptionsProps) {
  const { t } = useTranslation();
  const nestedOptions: NestedOptions = useMemo(
    () =>
      buildNestedOptions(
        options,
        hasEmptyOption,
        t("cph-theme-ticket-fields.dropdown.back-option-label", "Back")
      ),
    [options, hasEmptyOption, t]
  );

  const [currentGroup, setCurrentGroup] = useState<OptionGroup>(
    getInitialGroup(nestedOptions)
  );

  useEffect(() => {
    setCurrentGroup(nestedOptions[ROOT_GROUP_IDENTIFIER]);
  }, [nestedOptions]);

  const setCurrentGroupByIdentifier = (identifier: GroupIdentifier) => {
    const group = nestedOptions[identifier];
    if (group) {
      setCurrentGroup(group);
    }
  };

  return {
    currentGroup,
    isGroupIdentifier,
    setCurrentGroupByIdentifier,
  };
}
