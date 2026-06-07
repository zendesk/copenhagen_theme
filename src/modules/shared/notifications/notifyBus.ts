import type { ToastNotification } from "./ToastNotification";

let listeners: ((n: ToastNotification) => void)[] = [];
let queue: ToastNotification[] = [];

export function resetNotifyBus() {
  listeners = [];
  queue = [];
}

export function emitNotify(notification: ToastNotification): void {
  if (listeners.length === 0) {
    queue.push(notification);
  } else {
    listeners.forEach((fn) => fn(notification));
  }
}

export function subscribeNotify(fn: (n: ToastNotification) => void): void {
  listeners.push(fn);

  if (queue.length) {
    queue.forEach(fn);
    queue = [];
  }
}

export function unsubscribeNotify(fn: (n: ToastNotification) => void): void {
  listeners = listeners.filter((l) => l !== fn);
}
