import { useToast } from "@zendeskgarden/react-notifications";
import { useEffect } from "react";
import { subscribeNotify } from "../notifyBus";

export function useGlobalNotify() {
  const { addToast } = useToast();

  useEffect(() => {
    return subscribeNotify((node) => {
      addToast(node);
    });
  }, [addToast]);
}