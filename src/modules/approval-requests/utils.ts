// MKTODO: update to proper locale
export const formatApprovalRequestDate = (
  timestamp: string,
  monthFormat: Intl.DateTimeFormatOptions["month"] = "long"
) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("en-US", {
    month: monthFormat,
    day: "numeric",
    year: "numeric",
  })} ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
