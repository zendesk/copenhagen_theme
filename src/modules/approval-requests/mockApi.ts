import type { MockApprovalRequest, MockTicket } from "./types";

export const fetchMockApprovalRequest =
  async (): Promise<MockApprovalRequest> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      id: 1234,
      subject: "New Laptop Request",
      message: "I need a new laptop for development work",
      status: "PENDING",
      created_at: "2023-07-20T10:00:00Z",
      assignee_user: {
        id: 101,
        name: "Jane Smith",
        photo: {
          content_url: "https://placekitten.com/100/100",
        },
      },
      created_by_user: {
        id: 102,
        name: "John Doe",
        photo: {
          content_url: "https://placekitten.com/101/101",
        },
      },
    };
  };

export const fetchMockTicket = async (): Promise<MockTicket> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: 5678,
    priority: "high",
    requester: {
      id: 102,
      name: "John Doe",
      photo: {
        content_url: "https://placekitten.com/101/101",
      },
    },
  };
};
