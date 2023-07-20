import type { TicketForm } from "./data-types/TicketForm";
import { TicketFormField } from "./ticket-form-field/TicketFormField";

export interface NewRequestFormProps {
  ticketForms: TicketForm[];
}

export function NewRequestForm({ ticketForms }: NewRequestFormProps) {
  return (
    <form>
      <TicketFormField ticketForms={ticketForms} />
    </form>
  );
}
