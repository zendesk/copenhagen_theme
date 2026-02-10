import { useModalContainer } from "../../../shared/garden-theme/modal-container/useModalContainer";

/**
 * @deprecated This component is no longer needed. Use `listboxAppendToNode`
 * on Combobox or `appendToNode` on Menu directly instead.
 */
export function useModalAppendToNode(): HTMLDivElement {
  return useModalContainer();
}
