import type { FilterValue } from "../../../data-types/FilterValue";

interface ValidFormState {
  state: "valid";
  values: FilterValue[];
}

export type FormErrors<Key extends string = string> = {
  [key in Key]?: string;
};

interface InvalidFormState<Key extends string = string> {
  state: "invalid";
  errors: FormErrors<Key>;
}

export type FormState<Key extends string = string> =
  | ValidFormState
  | InvalidFormState<Key>;
