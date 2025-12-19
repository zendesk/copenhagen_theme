import { useContext } from "react";
import { PushNotificationContext } from "../contexts/PushNotification";
import type { pushNotification } from "../data-types/hc/HCData";

export function usePushNotification(): pushNotification {
  const pushNotification = useContext(PushNotificationContext);

  if (pushNotification === null) {
    throw Error();
  } else return pushNotification;
}
