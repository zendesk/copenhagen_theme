import { l as useToast, r as reactExports, j as jsxRuntimeExports, N as Notification, m as Title, n as Close, X as reactDomExports } from 'vendor-bundle';
import { F as FLASH_NOTIFICATIONS_KEY, T as ThemeProviders, c as createTheme } from 'addFlashNotification-bundle';
export { a as addFlashNotification } from 'addFlashNotification-bundle';

function FlashNotifications({ notifications, closeLabel, }) {
    const { addToast } = useToast();
    reactExports.useEffect(() => {
        for (const notification of notifications) {
            const { type, title, message } = notification;
            addToast(({ close }) => (jsxRuntimeExports.jsxs(Notification, { type: type, children: [title && jsxRuntimeExports.jsx(Title, { children: title }), message, jsxRuntimeExports.jsx(Close, { "aria-label": closeLabel, onClick: close })] })));
        }
    }, [addToast, notifications, closeLabel]);
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
}

function renderFlashNotifications(settings, closeLabel) {
    const flashNotifications = window.sessionStorage.getItem(FLASH_NOTIFICATIONS_KEY);
    if (flashNotifications === null) {
        return;
    }
    window.sessionStorage.removeItem(FLASH_NOTIFICATIONS_KEY);
    try {
        const parsedNotifications = JSON.parse(flashNotifications);
        const container = document.createElement("div");
        document.body.appendChild(container);
        reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(FlashNotifications, { notifications: parsedNotifications, closeLabel: closeLabel }) }), container);
    }
    catch (e) {
        console.error("Cannot render flash notifications", e);
    }
}

export { renderFlashNotifications };