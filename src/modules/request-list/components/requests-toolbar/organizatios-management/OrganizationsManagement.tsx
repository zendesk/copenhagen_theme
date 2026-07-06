import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@zendeskgarden/react-buttons";
import type { Organization, User } from "../../../data-types";
import FollowOrganizationsModal from "./FollowOrganizationsModal";

interface OrganizationsManagementProps {
  organizations: Organization[];
  user: User;
}

export default function OrganizationsManagement({
  organizations,
  user,
}: OrganizationsManagementProps): JSX.Element {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={onClick} data-test-id={`followOrganizationButton`}>
        {t("guide-requests-app.followOrganization", "Follow organization")}
      </Button>
      {isOpen && (
        <FollowOrganizationsModal
          organizations={organizations}
          user={user}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
