import type {
  MockApprovalRequest,
  MockTicket,
  MockSearchApprovalRequest,
} from "./types";

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
          content_url: "https://example.com/100/100",
        },
      },
      created_by_user: {
        id: 102,
        name: "John Doe",
        photo: {
          content_url: "https://example.com/101/101",
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
        content_url: "https://example.com/101/101",
      },
    },
    custom_fields: [
      {
        display_name: "Software",
        display_value: "Adobe Creative Suite",
      },
      {
        display_name: "Cost per user",
        display_value: "$15 monthly",
      },
      {
        display_name: "Role",
        display_value: "Editor",
      },
    ],
  };
};

export const fetchMockSearchApprovalRequestList = async (): Promise<
  MockSearchApprovalRequest[]
> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      subject: "Approval required for figma access request",
      requester_name: "John Doe",
      created_by_name: "Henry Martin",
      created_at: "2024-01-15T10:00:00Z",
      status: "PENDING",
    },
    {
      id: 2,
      subject: "Approval required for Pendo access request",
      requester_name: "Jane Smith",
      created_by_name: "Henry Martin",
      created_at: "2024-01-14T15:30:00Z",
      status: "PENDING",
    },
    {
      id: 3,
      subject: "Approval required for AWS access",
      requester_name: "Mike Johnson",
      created_by_name: "Henry Martin",
      created_at: "2024-01-13T09:15:00Z",
      status: "CLARIFICATION_REQUESTED",
    },
  ];
};
