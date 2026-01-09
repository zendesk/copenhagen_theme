import { useTranslation } from "react-i18next";
import { Button } from "@zendeskgarden/react-buttons";
import {
  Dropdown,
  Menu,
  Item,
  Trigger,
} from "@zendeskgarden/react-dropdowns.legacy";
import { Tabs } from "@zendeskgarden/react-tabs";
import ChevronIcon from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import type {
  SelectedTab,
  SelectedTabName,
} from "../../data-types/request-list-params";
import {
  CCD_REQUESTS_TAB_NAME,
  MY_REQUESTS_TAB_NAME,
  ORG_REQUESTS_TAB_NAME,
} from "../../data-types/request-list-params";
import styled from "styled-components";
import type { Organization } from "../../data-types";
import { Mobile, Desktop } from "../../utils/mediaQuery";
import { useDownshiftEnvironment } from "../../../shared/garden-shadow/src/useDownshiftEnvironment";
import { useState } from "react";

const Container = styled.div`
  margin-bottom: ${(p) => p.theme.space.xxs};
  position: relative;
`;

const StyledButton = styled(Button)`
  background: none !important;
  border: 0;
  border-bottom: 3px solid;
  border-radius: 0;
  justify-content: start;
  line-height: 40px;
  margin-bottom: 20px;
  &:hover {
    color: ${(p) => p.theme.colors.primaryHue};
  }
`;

const StyledMenu = styled(Menu)`
  width: 100%;
`;

function getDefaultOrganization(
  organizations: Organization[]
): Organization | undefined {
  const defaultOrganization = organizations.find(
    (organization) => organization.default
  );
  return defaultOrganization || organizations[0];
}

interface Props {
  selectedTab: SelectedTab;
  organizations: Organization[];
  onTabSelected: (clickedTab: SelectedTab) => void;
}

export default function RequestsTabs({
  selectedTab,
  organizations,
  onTabSelected,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const [iconIsRotated, setIconIsRotated] = useState(false);
  const downshiftEnvironment = useDownshiftEnvironment();

  const getTabLabel = (tab: SelectedTabName) => {
    switch (tab) {
      case ORG_REQUESTS_TAB_NAME:
        return t(
          "guide-requests-app.organizationalRequests",
          "Organizational requests"
        );
      case MY_REQUESTS_TAB_NAME:
        return t("guide-requests-app.myRequests", "My requests");
      case CCD_REQUESTS_TAB_NAME:
        return t("guide-requests-app.ccdRequests", "Requests I am CC'd on");
    }
  };

  const availableTabs: SelectedTabName[] = [
    MY_REQUESTS_TAB_NAME,
    CCD_REQUESTS_TAB_NAME,
  ];
  if (organizations.length > 0) {
    availableTabs.push(ORG_REQUESTS_TAB_NAME);
  }

  function handleTabSelect(name: SelectedTabName) {
    if (name === ORG_REQUESTS_TAB_NAME) {
      const defaultOrg = getDefaultOrganization(organizations);
      if (defaultOrg) {
        onTabSelected({
          name: ORG_REQUESTS_TAB_NAME,
          organizationId: defaultOrg.id,
        });
      }
    } else {
      onTabSelected({ name });
    }
  }

  const handleMobileTabSelected = (name: SelectedTabName) => {
    handleTabSelect(name);
  };

  return (
    <Container>
      <Mobile>
        <Dropdown
          onSelect={handleMobileTabSelected}
          downshiftProps={{ environment: downshiftEnvironment }}
          onStateChange={({ isOpen }) => {
            if (isOpen != null) {
              setIconIsRotated(isOpen);
            }
          }}
        >
          <Trigger>
            <StyledButton isBasic isStretched>
              {getTabLabel(selectedTab.name)}
              <Button.EndIcon isRotated={iconIsRotated}>
                <ChevronIcon />
              </Button.EndIcon>
            </StyledButton>
          </Trigger>
          <StyledMenu
            popperModifiers={{
              offset: {
                fn(data) {
                  data.styles.width = `${parseInt(
                    String(data.offsets.reference.width),
                    10
                  )}px`;
                  return data;
                },
              },
            }}
          >
            {availableTabs.map((tabName) => (
              <Item key={tabName} value={tabName}>
                {getTabLabel(tabName)}
              </Item>
            ))}
          </StyledMenu>
        </Dropdown>
      </Mobile>
      <Desktop>
        <Tabs onChange={handleTabSelect} selectedItem={selectedTab.name}>
          <Tabs.TabList>
            {availableTabs.map((tabName) => (
              <Tabs.Tab
                key={tabName}
                data-test-id={`tab-${tabName}`}
                item={tabName}
              >
                {getTabLabel(tabName)}
              </Tabs.Tab>
            ))}
          </Tabs.TabList>
        </Tabs>
      </Desktop>
    </Container>
  );
}
