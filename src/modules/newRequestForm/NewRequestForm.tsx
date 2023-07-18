import { TicketFormField } from "./TicketFormField";
import { TicketForm } from "./types";

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
