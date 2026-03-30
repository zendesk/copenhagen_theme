import type React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  isSameDay as dfIsSameDay,
  subDays,
  isSameYear,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import styled from "styled-components";
import { getColor } from "@zendeskgarden/react-theming";
import { SM } from "@zendeskgarden/react-typography";

const StyledTimestamp = styled(SM)`
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  align-self: center;
  justify-content: center;
  padding-top: 1px;
`;

const isSameDay = (date1: Date, date2: Date) => dfIsSameDay(date1, date2);

const isYesterday = (date: Date, now: Date) => {
  const yesterday = subDays(now, 1);
  return dfIsSameDay(date, yesterday);
};

function detectHour12(locale: string): boolean {
  const dtf = new Intl.DateTimeFormat(locale, { hour: "numeric" });
  const options = dtf.resolvedOptions();
  return options.hour12 ?? true;
}

const formatDate = (date: Date, locale: string) =>
  date.toLocaleDateString(locale, { month: "short", day: "2-digit" });

const formatDateWithYear = (date: Date, locale: string) =>
  date.toLocaleDateString(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const formatTime = (date: Date, locale: string, hour12: boolean) =>
  date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12,
  });

interface RelativeTimeProps {
  eventTime: string;
  locale: string;
}

export const RelativeTime: React.FC<RelativeTimeProps> = ({
  eventTime,
  locale,
}) => {
  const { t } = useTranslation();
  const hour12 = useMemo(() => detectHour12(locale), [locale]);
  const now = new Date();
  const eventDate = new Date(eventTime);
  if (isNaN(eventDate.getTime())) return null;

  const elapsedSeconds = differenceInSeconds(now, eventDate);
  const elapsedMinutes = differenceInMinutes(now, eventDate);

  if (elapsedSeconds < 0 || elapsedSeconds < 60) {
    return (
      <StyledTimestamp>
        {
          (t("approval_request.clarification.timestamp_lessThanAMinuteAgo"),
          `< 1 minute ago`)
        }
      </StyledTimestamp>
    );
  }

  if (elapsedMinutes < 60) {
    const pluralRules = new Intl.PluralRules(locale);
    const plural = pluralRules.select(elapsedMinutes);
    return (
      <StyledTimestamp>
        {
          (t("approval_request.clarification.timestamp_minutesAgo", {
            count: elapsedMinutes,
            plural,
          }),
          `${elapsedMinutes} minute${plural === "one" ? "" : "s"} ago`)
        }
      </StyledTimestamp>
    );
  }

  const timeStr = formatTime(eventDate, locale, hour12);

  if (isSameDay(eventDate, now)) {
    return (
      <StyledTimestamp>
        {
          (t("approval_request.clarification.timestamp_todayAt", {
            time: timeStr,
          }),
          `Today at ${timeStr}`)
        }
      </StyledTimestamp>
    );
  }

  if (isYesterday(eventDate, now)) {
    return (
      <StyledTimestamp>
        {
          (t("approval_request.clarification.timestamp_yesterdayAt", {
            time: timeStr,
          }),
          `Yesterday at ${timeStr}`)
        }
      </StyledTimestamp>
    );
  }

  if (isSameYear(eventDate, now)) {
    const dateStr = formatDate(eventDate, locale);
    return (
      <StyledTimestamp>
        {
          (t("approval_request.clarification.timestamp_dateAt", {
            date: dateStr,
            time: timeStr,
          }),
          `${dateStr} at ${timeStr}`)
        }
      </StyledTimestamp>
    );
  }

  const dateStr = formatDateWithYear(eventDate, locale);
  return (
    <StyledTimestamp>
      {
        (t("approval_request.clarification.timestamp_dateAt", {
          date: dateStr,
          time: timeStr,
        }),
        `${dateStr} at ${timeStr}`)
      }
    </StyledTimestamp>
  );
};

export default RelativeTime;
