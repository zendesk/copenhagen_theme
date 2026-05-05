import { useEffect, useState } from "react";
import type { CursorPaginatedResponse } from "../utils/pagination/CursorPaginatedResponse";
import type { TicketField, TicketForm } from "../data-types";
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

async function listTicketForms(
  locale: string,
  pageSize = 100
): Promise<CursorPaginatedResponse<"ticket_forms", TicketForm>> {
  const response = await fetch(
    `/api/v2/ticket_forms?locale=${locale}&associated_to_brand=true&active=true&form_type=all&page[size]=${pageSize}`
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
      const [ticketFields, ticketForms] = await Promise.all([
        fetchAllCursorPages(() => listTicketFields(locale), "ticket_fields"),
        fetchAllCursorPages(() => listTicketForms(locale), "ticket_forms"),
      ]);

      const activeTicketFieldIds = new Set<number>(
        ticketForms.flatMap((ticketForm) => ticketForm.ticket_field_ids ?? [])
      );

      setTicketFields(
        ticketFields.filter(
          (ticketField) =>
            ticketField.active && activeTicketFieldIds.has(ticketField.id)
        )
      );

      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTicketFields();
  }, []);

  return { ticketFields, error, isLoading };
}
