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
  | "CLARIFICATION_REQUESTED";

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
}
