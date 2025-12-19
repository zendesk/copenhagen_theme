import { useEffect, useState } from "react";
import type { CursorPaginatedResponse } from "../utils/pagination/CursorPaginatedResponse";
import type { TicketField } from "../data-types";
import { fetchAllCursorPages } from "../utils/pagination/fetchAllCursorPages";

interface UseTicketFields {
  ticketFields: TicketField[];
  error?: Error;
  isLoading: boolean;
}

async function listTicketFields(
  locale: string,
  pageSize = 100
): Promise<CursorPaginatedResponse<"ticket_fields", TicketField>> {
  const response = await fetch(
    `/api/v2/ticket_fields.json?locale=${locale}&page[size]=${pageSize}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export function useTicketFields(locale: string): UseTicketFields {
  const [ticketFields, setTicketFields] = useState<TicketField[]>([]);
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTicketFields() {
    try {
      const response = await fetchAllCursorPages(
        () => listTicketFields(locale),
        "ticket_fields"
      );
      setTicketFields(
        response.filter(
          (ticketField) => ticketField.active || ticketField.type == "subject"
        )
      );

      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
    }
  }

  useEffect(() => {
    fetchTicketFields();
  }, []);

  return { ticketFields, error, isLoading };
}
