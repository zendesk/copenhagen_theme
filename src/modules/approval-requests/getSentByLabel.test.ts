import { getSentByLabel } from "./getSentByLabel";
import type { ApprovalRequest, SearchApprovalRequest } from "./types";
import { ORIGINATION_TYPES } from "./constants";

describe("getSentByLabel", () => {
  const mockT = (key: string, defaultValue: string) => defaultValue;

  describe("with ApprovalRequest type", () => {
    it('returns "Action flow" when origination_type is ACTION_FLOW_ORIGINATION', () => {
      const request: ApprovalRequest = {
        id: "123",
        subject: "Test",
        message: "Test message",
        status: "active",
        created_at: "2024-02-20T10:00:00Z",
        created_by_user: {
          id: 123,
          name: "John Sender",
          photo: { content_url: null },
        },
        assignee_user: {
          id: 456,
          name: "Jane Approver",
          photo: { content_url: null },
        },
        decided_at: null,
        decisions: [],
        withdrawn_reason: null,
        ticket_details: {
          id: "789",
          priority: "normal",
          custom_fields: [],
          requester: {
            id: 789,
            name: "Request Creator",
            photo: { content_url: null },
          },
        },
        origination_type: ORIGINATION_TYPES.ACTION_FLOW,
      } as ApprovalRequest;

      const result = getSentByLabel(request, mockT);
      expect(result).toBe("Action flow");
    });

    it('returns "API" when origination_type is API_ORIGINATION', () => {
      const request: ApprovalRequest = {
        id: "123",
        subject: "Test",
        message: "Test message",
        status: "active",
        created_at: "2024-02-20T10:00:00Z",
        created_by_user: {
          id: 123,
          name: "John Sender",
          photo: { content_url: null },
        },
        assignee_user: {
          id: 456,
          name: "Jane Approver",
          photo: { content_url: null },
        },
        decided_at: null,
        decisions: [],
        withdrawn_reason: null,
        ticket_details: {
          id: "789",
          priority: "normal",
          custom_fields: [],
          requester: {
            id: 789,
            name: "Request Creator",
            photo: { content_url: null },
          },
        },
        origination_type: ORIGINATION_TYPES.API,
      } as ApprovalRequest;

      const result = getSentByLabel(request, mockT);
      expect(result).toBe("API");
    });

    it("returns user name when origination_type is not ACTION_FLOW or API", () => {
      const request: ApprovalRequest = {
        id: "123",
        subject: "Test",
        message: "Test message",
        status: "active",
        created_at: "2024-02-20T10:00:00Z",
        created_by_user: {
          id: 123,
          name: "John Sender",
          photo: { content_url: null },
        },
        assignee_user: {
          id: 456,
          name: "Jane Approver",
          photo: { content_url: null },
        },
        decided_at: null,
        decisions: [],
        withdrawn_reason: null,
        ticket_details: {
          id: "789",
          priority: "normal",
          custom_fields: [],
          requester: {
            id: 789,
            name: "Request Creator",
            photo: { content_url: null },
          },
        },
      } as ApprovalRequest;

      const result = getSentByLabel(request, mockT);
      expect(result).toBe("John Sender");
    });
  });

  describe("with SearchApprovalRequest type", () => {
    it('returns "Action flow" when origination_type is ACTION_FLOW_ORIGINATION', () => {
      const request: SearchApprovalRequest = {
        id: 123,
        subject: "Test",
        requester_name: "Jane Doe",
        created_by_name: "John Doe",
        created_at: "2024-02-20T10:00:00Z",
        status: "active",
        origination_type: ORIGINATION_TYPES.ACTION_FLOW,
      } as SearchApprovalRequest;

      const result = getSentByLabel(request, mockT);
      expect(result).toBe("Action flow");
    });

    it('returns "API" when origination_type is API_ORIGINATION', () => {
      const request: SearchApprovalRequest = {
        id: 123,
        subject: "Test",
        requester_name: "Jane Doe",
        created_by_name: "John Doe",
        created_at: "2024-02-20T10:00:00Z",
        status: "active",
        origination_type: ORIGINATION_TYPES.API,
      } as SearchApprovalRequest;

      const result = getSentByLabel(request, mockT);
      expect(result).toBe("API");
    });

    it("returns created_by_name when origination_type is not ACTION_FLOW or API", () => {
      const request: SearchApprovalRequest = {
        id: 123,
        subject: "Test",
        requester_name: "Jane Doe",
        created_by_name: "John Doe",
        created_at: "2024-02-20T10:00:00Z",
        status: "active",
      } as SearchApprovalRequest;

      const result = getSentByLabel(request, mockT);
      expect(result).toBe("John Doe");
    });
  });
});
