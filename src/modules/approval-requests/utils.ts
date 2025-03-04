export const formatApprovalRequestDate = (
  timestamp: string,
  locale: string,
  monthFormat: Intl.DateTimeFormatOptions["month"] = "short"
) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString(locale, {
    month: monthFormat,
    day: "numeric",
    year: "numeric",
  })} ${date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
};
