import { useEffect, useState } from "react";

export interface CurrentUser {
  id: number;
  url: string;
  name: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
  timeZone: string;
  ianaTimeZone: string;
  phone: string | null;
  sharedPhoneNumber: string | null;
  photo: Record<string, unknown> | null;
  localeId: number;
  locale: string;
  organizationId: number;
  role: string;
  verified: boolean;
  authenticityToken: string;
  externalId: string | null;
  tags: string[];
  alias: string;
  active: boolean;
  shared: boolean;
  sharedAgent: boolean;
  lastLoginAt: string;
  twoFactorAuthEnabled: boolean | null;
  signature: string;
  details: string;
  notes: string;
  roleType: number;
  customRoleId: number;
  moderator: boolean;
  ticketRestriction: string | null;
  onlyPrivateComments: boolean;
  restrictedAgent: boolean;
  suspended: boolean;
  defaultGroupId: number;
  reportCsv: boolean;
  userFields: Record<string, unknown>;
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/v2/users/me.json");
        if (!response.ok) {
          throw new Error("Error fetching current user data");
        }
        const data = await response.json();
        setCurrentUser(data.user);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  return { currentUser, error, isLoading };
}
