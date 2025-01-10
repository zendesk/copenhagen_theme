// NOTE: these interfaces are temporary and will be replaced by the actual ones
interface MockUser {
  id: number;
  name: string;
  photo: {
    content_url: string;
  };
}

type MockApprovalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CLARIFICATION_REQUESTED"
  | "WITHDRAWN";

export interface MockApprovalRequest {
  id: number;
  subject: string;
  message: string;
  status: MockApprovalRequestStatus;
  created_at: string;
  assignee_user: MockUser;
  created_by_user: MockUser;
}

export interface MockTicket {
  id: number;
  priority: string;
  requester: MockUser;
  custom_fields: Record<string, string>[];
}

export interface MockSearchApprovalRequest {
  id: number;
  subject: string;
  requester_name: string;
  created_by_name: string;
  created_at: string;
  status: MockApprovalRequestStatus;
}
