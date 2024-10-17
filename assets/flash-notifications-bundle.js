import { u as useToast, r as reactExports, j as jsxRuntimeExports, N as Notification, T as Title, C as Close, aa as FLASH_NOTIFICATIONS_KEY, a7 as reactDomExports, a8 as ThemeProviders, a9 as createTheme } from 'shared';

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
