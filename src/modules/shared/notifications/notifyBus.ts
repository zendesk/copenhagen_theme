import type { Content } from "@zendeskgarden/react-notifications/dist/typings/elements/toaster/useToast";

let listeners: ((render: Content) => void)[] = [];
let queue: Content[] = [];

export function resetNotifyBus() {
  listeners = [];
  queue = [];
}

export function emitNotify(render: Content): void {
  if (listeners.length === 0) {
    queue.push(render);
  } else {
    listeners.forEach((fn) => fn(render));
  }
}

export function subscribeNotify(fn: (render: Content) => void): () => void {
  listeners.push(fn);

  if (queue.length) {
    queue.forEach(fn);
    queue = [];
  }

  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}
