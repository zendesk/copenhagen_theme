import { isToday, isYesterday } from "date-fns";
import upperFirst from "lodash/upperFirst";
import { useEffect, useState, useMemo } from "react";

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

interface RelativeTimeProps {
  date: Date;
  locale: string;
}

export default function RelativeTime({
  date,
  locale,
}: RelativeTimeProps): JSX.Element {
  const relativeTimeFormat = useMemo(
    () => new Intl.RelativeTimeFormat(locale, { numeric: "auto" }),
    [locale]
  );

  const dateTimeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [locale]
  );

  const timeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        timeStyle: "short",
      }),
    [locale]
  );

  const [value, setValue] = useState("");

  useEffect(() => {
    const update = () => {
      setValue(
        getRelativeTime(date, relativeTimeFormat, dateTimeFormat, timeFormat)
      );
    };

    const intervalId = setInterval(() => {
      update();
    }, ONE_MINUTE);

    update();

    return () => {
      clearInterval(intervalId);
    };
  }, [date, relativeTimeFormat, dateTimeFormat, timeFormat]);

  return <>{value}</>;
}

function getRelativeTime(
  date: Date,
  relativeTimeFormat: Intl.RelativeTimeFormat,
  dateTimeFormat: Intl.DateTimeFormat,
  timeFormat: Intl.DateTimeFormat
): string {
  const now = new Date();
  const elapsed = now.valueOf() - date.valueOf();

  if (elapsed < 0) {
    return dateTimeFormat.format(date);
  }

  if (elapsed < ONE_HOUR) {
    const minutes = Math.floor(elapsed / ONE_MINUTE);
    return upperFirst(relativeTimeFormat.format(-minutes, "minutes"));
  }

  if (isToday(date)) {
    const value = `${relativeTimeFormat.format(0, "day")}, ${timeFormat.format(
      date
    )}`;

    return upperFirst(value);
  }

  if (isYesterday(date)) {
    const value = `${relativeTimeFormat.format(-1, "day")}, ${timeFormat.format(
      date
    )}`;

    return upperFirst(value);
  }

  return dateTimeFormat.format(date);
}
