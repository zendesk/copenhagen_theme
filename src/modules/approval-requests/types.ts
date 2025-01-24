// NOTE: these interfaces are temporary and will be replaced by the actual ones
interface MockUser {
  id: number;
  name: string;
  photo: {
    content_url: string | null;
  };
}

type MockApprovalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CLARIFICATION_REQUESTED"
  | "WITHDRAWN";

export interface ApprovalRequest {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  assignee_user: MockUser;
  created_by_user: MockUser;
  ticket_details: MockTicket;
}

export interface MockTicket {
  id: string;
  priority: string;
  custom_fields: Array<Record<string, string>>;
  requester: MockUser;
}

export interface MockSearchApprovalRequest {
  id: number;
  subject: string;
  requester_name: string;
  created_by_name: string;
  created_at: string;
  status: MockApprovalRequestStatus;
}
