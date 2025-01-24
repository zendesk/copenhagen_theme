import type { ApprovalRequest, MockSearchApprovalRequest } from "./types";

export const fetchMockApprovalRequest = async (): Promise<ApprovalRequest> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: "1234",
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
    ticket_details: {
      id: "5678",
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
          title_in_portal: "Software",
          id: "6746",
          value: "Adobe Creative Suite",
        },
        {
          title_in_portal: "Cost per user",
          id: "6747",
          value: "$15 monthly",
        },
        {
          title_in_portal: "Role",
          id: "6748",
          value: "Editor",
        },
      ],
    },
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
