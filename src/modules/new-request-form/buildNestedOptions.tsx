import type { OptionType } from "@zendeskgarden/react-dropdowns.next/dist/typings/types";
import type { FieldOption } from "./data-types";

export interface NestedOption {
  name: string;
  value: string;
  type?: OptionType;
  label: string;
}
export type NestedOptions = Record<string, NestedOption[]>;

// Maps a flat option data structure into a nested option structure.
// Original option data structure:
// [
//   {name: 'Color::Special::Radioactive Green', value: 'color__special__radioactive_green'}
//   {name: 'Color::Red', value: 'color__red'}
//   {name: 'Color::Green', value: 'color__green'}
//   {name: 'Simple Value', value: 'simple_value'}
// ]
// Mapped nested option data strucutre:
// {
//   "root": [
//     {value: 'Color', name: 'Color', type: 'next'},
//     {value: 'simple_value', label: 'Simple Value', name: 'Simple Value'}
//   ],
//   "Color": [
//       {value: 'Special', name: 'Special', type: 'next'},
//       {value: 'color__red', label: 'Color::Red', name: 'Red'},
//       {value: 'color__green', label: 'Color::Green', name: 'Green'},
//   ],
//   "Special": [
//      {value: 'color__special__atomic_green', label: 'Color::Special::Atomic Green', name: 'Atomic Green'}
//   ]
export function buildNestedOptions(options: FieldOption[]): NestedOptions {
  const result: NestedOptions = { root: [] };

  options.forEach((option: FieldOption) => {
    // for flat values
    if (!option.name.includes("::")) {
      result["root"]?.push({
        value: option.value,
        label: option.name,
        name: option.name,
      });
    }
    // for nested values ex: (Color::Special::Radioactive Green)
    else {
      const optionNameList: string[] = option.name.split("::");
      for (let i = 0; i < optionNameList.length - 1; i++) {
        const subGroupName = optionNameList[i];
        if (subGroupName && result[subGroupName] == null) {
          // creates an entry in `result` to store the options associated to `subGroupName`
          result[subGroupName] = [];

          // links the new option subgroup to the parent option group
          const list = i == 0 ? result.root : result[optionNameList[i - 1]!];
          list?.push({
            value: subGroupName,
            label: subGroupName,
            name: subGroupName,
            type: "next",
          });
        }
      }
      // adds a option to the last subgroup of the chain, ex:
      // ex: adding `Radioactive Green` to `result[Special]`
      const lastSubGroupName = optionNameList[optionNameList.length - 2]!;
      result[lastSubGroupName]?.push({
        value: option.value,
        label: option.name,
        name: optionNameList.slice(-1)[0] as string,
      });
    }
  });

  return result;
}
