interface ApprovalRequestUser {
  id: number;
  name: string;
  photo: {
    content_url: string | null;
  };
}

export interface ApprovalDecision {
  decided_at: string | null;
  decided_by_user: {
    id: number;
    name: string;
    photo: {
      content_url: string | null;
    };
  };
  decision_notes: string | null;
  status: ApprovalRequestStatus;
  origination_type?: string;
}

export type ApprovalRequestStatus =
  | "active"
  | "approved"
  | "rejected"
  | "withdrawn";

export type ApprovalRequestDropdownStatus = ApprovalRequestStatus | "any";

export interface ApprovalRequest {
  id: string;
  subject: string;
  message: string;
  status: ApprovalRequestStatus;
  created_at: string;
  created_by_user: ApprovalRequestUser;
  decided_at: string | null;
  decisions: ApprovalDecision[];
  assignee_user: ApprovalRequestUser;
  ticket_details?: ApprovalRequestTicket;
  withdrawn_reason: string | null;
  origination_type?: string;
  clarification_flow_messages?: ApprovalClarificationFlowMessage[];
  // The `attachments` field is only present in the payload when the approvals_attachments arturo is enabled
  attachments?: ApprovalRequestAttachment[];
}

export interface ApprovalRequestAttachment {
  id: string;
  filename: string;
  content_url: string;
  content_type?: string;
  size: number;
  created_at: string;
  created_by: string;
  malware_scan_status: string;
}

export interface ApprovalRequestTicket {
  id: string;
  priority: string;
  custom_fields: Array<
    Record<string, string | boolean | Array<string> | undefined>
  >;
  requester: ApprovalRequestUser;
}

export interface SearchApprovalRequest {
  id: number;
  subject: string;
  requester_name: string | null;
  created_by_name: string;
  created_at: string;
  status: ApprovalRequestStatus;
  origination_type?: string;
}

export type ApprovalClarificationFlowMessage = {
  id: string;
  author: {
    id: number;
    email?: string | null;
    avatar: string;
    name: string;
  };
  message: string;
  created_at: string;
};
