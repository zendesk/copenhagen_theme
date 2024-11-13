import styled from "styled-components";
import { TicketField } from "../../../ticket-fields";
import type { Field } from "../../../ticket-fields";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;

interface ItemRequestFormProps {
  requestFields: Field[];
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  defaultOrganizationId: string | null;
  handleChange: (
    field: Field,
    value: string | string[] | boolean | undefined
  ) => void;
}

export const ItemRequestForm = ({
  requestFields,
  baseLocale,
  hasAtMentions,
  userRole,
  userId,
  brandId,
  defaultOrganizationId,
  handleChange,
}: ItemRequestFormProps) => {
  return (
    <Form>
      {requestFields.map((field) => (
        <TicketField
          key={field.id}
          field={field}
          baseLocale={baseLocale}
          hasAtMentions={hasAtMentions}
          userRole={userRole}
          userId={userId}
          brandId={brandId}
          defaultOrganizationId={defaultOrganizationId}
          handleChange={handleChange}
        />
      ))}
    </Form>
  );
};
