import type { OrganizationPagination } from "../../../hooks/useOrganizations";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@zendeskgarden/react-buttons";
import { Checkbox, Field } from "@zendeskgarden/react-forms";
import { Modal } from "@zendeskgarden/react-modals";
import { Paragraph } from "@zendeskgarden/react-typography";
import { Alert } from "@zendeskgarden/react-notifications";
import { Dots } from "@zendeskgarden/react-loaders";
import styled from "styled-components";
import type { Organization, User } from "../../../data-types";
import { notify } from "../../../../shared/notifications/notify";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";
import { OrganizationLoadMore } from "../OrganizationLoadMore";

interface OrganizationsManagementProps {
  organizations: Organization[];
  organizationPagination?: OrganizationPagination;
  user: User;
  onClose: () => void;
}

const DEFAULT_SHOWING_AMOUNT = 20 as const;
const SHOWING_AMOUNT_INCREMENT = 10 as const;

interface OrganizationSubscription {
  created_at: string;
  id: number;
  organization_id: number;
  user_id: number;
}

interface Subscription {
  organizationId: number;
  subscribed: boolean;
  subscriptionId: number | undefined;
  name: string;
  isError: boolean;
  isChecked: boolean;
}

const StyledField = styled(Field)`
  padding-bottom: ${(p) => p.theme.space.xs};
`;

const StyledParagraph = styled(Paragraph)`
  padding-bottom: ${(p) => p.theme.space.sm};
`;

const StyledAlert = styled(Alert)`
  margin-bottom: ${(p) => p.theme.space.sm};
`;

export default function FollowOrganizationsModal(
  props: OrganizationsManagementProps
): JSX.Element {
  const { t } = useTranslation();

  const { organizations, organizationPagination, user, onClose } = props;
  const [amountShowing, setAmountShowing] = useState<number>(
    DEFAULT_SHOWING_AMOUNT
  );
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [knownSubscriptions, setKnownSubscriptions] = useState<Record<
    string,
    OrganizationSubscription
  > | null>(null);
  const [subscriptionLoadFailed, setSubscriptionLoadFailed] = useState(false);

  const modalContainer = useModalContainer();

  const onSave = (): void => {
    resetFailedState();
    updateSubscriptions();
  };

  const onShowMore = (): void => {
    if (amountShowing >= subscriptions.length)
      organizationPagination?.loadMore();
    setAmountShowing(amountShowing + SHOWING_AMOUNT_INCREMENT);
  };

  const fetchSubscriptions = async (
    userId: number
  ): Promise<Record<string, OrganizationSubscription>> => {
    let totalSubscriptions: readonly OrganizationSubscription[] = [];
    let subscriptionUrl = `/api/v2/users/${userId}/organization_subscriptions.json?page[size]=100`;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(subscriptionUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch organization subscriptions");
      }

      const {
        organization_subscriptions,
        meta: { has_more },
        links: { next },
      }: {
        organization_subscriptions: readonly OrganizationSubscription[];
        meta: { has_more: boolean };
        links: { next: string };
      } = await response.json();

      hasMore = has_more;
      subscriptionUrl = next;
      totalSubscriptions = totalSubscriptions.concat(
        organization_subscriptions
      );
    }

    const lookUpMap: Record<string, OrganizationSubscription> = {};

    totalSubscriptions.forEach((sub) => {
      lookUpMap[`${sub.organization_id}`] = sub;
    });
    return lookUpMap;
  };

  const updateSubscriptions = async (): Promise<void> => {
    const updatedOrganizationSubscriptionState = subscriptions.map(
      (subscription) => ({ ...subscription, isError: false })
    );

    if (
      !updatedOrganizationSubscriptionState.some(
        (oss) => oss.subscribed !== oss.isChecked
      )
    ) {
      onClose();
      return;
    }

    setIsUpdating(true);
    const requests = updatedOrganizationSubscriptionState
      .filter((oss) => oss.subscribed !== oss.isChecked)
      .map(async (oss) => {
        let response;
        try {
          if (oss.subscribed) {
            response = await fetch(
              `/api/v2/organization_subscriptions/${oss.subscriptionId}.json`,
              {
                method: "DELETE",
                headers: {
                  "X-CSRF-Token": user.authenticity_token,
                },
              }
            );
          } else {
            response = await fetch(`/api/v2/organization_subscriptions.json`, {
              body: JSON.stringify({
                organization_subscription: {
                  user_id: user.id,
                  organization_id: oss.organizationId,
                },
              }),
              method: "POST",
              headers: {
                "X-CSRF-Token": user.authenticity_token,
                "Content-Type": "application/json",
              },
            });
          }
          if (response.ok) {
            oss.subscribed = !oss.subscribed;
            oss.isError = false;
          } else {
            throw Error(response.statusText);
          }
        } catch (e) {
          oss.isError = true;
        } finally {
          oss.isChecked = oss.subscribed;
        }
      });

    await Promise.all(requests);

    setSubscriptions(updatedOrganizationSubscriptionState);

    setIsUpdating(false);

    if (!updatedOrganizationSubscriptionState.some((oss) => oss.isError)) {
      notify({
        type: "success",
        message: t(
          "guide-requests-app.organizationSubscriptionUpdated",
          "Organization subscription updated"
        ),
      });
      onClose();
    }
  };

  const subscriptionStateChange = (organizationId: number): void => {
    setSubscriptions(
      subscriptions.map((subscription) =>
        subscription.organizationId === organizationId
          ? { ...subscription, isChecked: !subscription.isChecked }
          : subscription
      )
    );
  };

  useEffect(() => {
    let active = true;
    fetchSubscriptions(user.id)
      .then((subscriptions) => {
        if (active) setKnownSubscriptions(subscriptions);
      })
      .catch(() => {
        if (active) setSubscriptionLoadFailed(true);
      });
    return () => {
      active = false;
    };
  }, [user.id]);

  useEffect(() => {
    if (!knownSubscriptions) return;
    setSubscriptions((current) => {
      const previous = new Map(
        current.map((subscription) => [
          subscription.organizationId,
          subscription,
        ])
      );
      return organizations.map(
        (organization) =>
          previous.get(organization.id) ?? {
            organizationId: organization.id,
            name: organization.name,
            subscriptionId: knownSubscriptions[organization.id]?.id,
            subscribed: knownSubscriptions[organization.id] !== undefined,
            isError: false,
            isChecked: knownSubscriptions[organization.id] !== undefined,
          }
      );
    });
  }, [organizations, knownSubscriptions]);

  const onCloseAlert = (e: React.MouseEvent | React.KeyboardEvent): void => {
    e.preventDefault();
    resetFailedState();
  };

  const resetFailedState = () => {
    setSubscriptions(
      subscriptions.map((subscription) => ({
        ...subscription,
        isError: false,
      }))
    );
  };

  return (
    <Modal onClose={onClose} appendToNode={modalContainer}>
      <Modal.Header>
        {t("guide-requests-app.followOrganization", "Follow organization")}
      </Modal.Header>
      <Modal.Body>
        <StyledParagraph>
          {t(
            "guide-requests-app.receiveEmailUpdatesOrganizationsTickets",
            "Receive email updates about tickets within these organizations:"
          )}
        </StyledParagraph>
        {!knownSubscriptions && !subscriptionLoadFailed && (
          <Dots size={20} delayMS={0} />
        )}
        {subscriptionLoadFailed && (
          <StyledAlert type="error">
            {t(
              "guide-requests-app.giveItAMomentAndTryAgain",
              "Give it a moment and try again"
            )}
          </StyledAlert>
        )}
        {subscriptions.some((o) => o.isError) && (
          <StyledAlert type="error">
            <Alert.Title>
              {t(
                "guide-requests-app.organizationSubscriptionCouldNotBeSaved",
                "Organization subscription could not be saved"
              )}
            </Alert.Title>
            {t(
              "guide-requests-app.giveItAMomentAndTryAgain",
              "Give it a moment and try again"
            )}
            <Modal.Close aria-label="Close Alert" onClick={onCloseAlert} />
          </StyledAlert>
        )}
        {subscriptions.slice(0, amountShowing).map((o) => (
          <StyledField key={o.organizationId}>
            <Checkbox
              data-test-id={`checkbox_${o.organizationId}`}
              checked={o.isChecked}
              disabled={isUpdating}
              onChange={() => subscriptionStateChange(o.organizationId)}
            >
              <Field.Label>{o.name}</Field.Label>
            </Checkbox>
            {o.isError && (
              <Field.Message validation="error">
                {t(
                  "guide-requests-app.organizationSubscriptionCouldNotBeSaved",
                  "Organization subscription could not be saved"
                )}
              </Field.Message>
            )}
          </StyledField>
        ))}
        <OrganizationLoadMore
          pagination={{
            hasMore:
              amountShowing < subscriptions.length ||
              !!organizationPagination?.hasMore,
            isLoading:
              isUpdating ||
              !knownSubscriptions ||
              !!organizationPagination?.isLoading,
            error: organizationPagination?.error,
            loadMore: onShowMore,
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterItem>
          <Button onClick={onClose} isBasic>
            {t("guide-requests-app.cancel", "Cancel")}
          </Button>
        </Modal.FooterItem>
        <Modal.FooterItem>
          <Button
            isPrimary
            onClick={onSave}
            disabled={
              isUpdating ||
              !knownSubscriptions ||
              organizationPagination?.isLoading
            }
            data-test-id={`saveOrganizationButton`}
          >
            {isUpdating ? (
              <Dots size={20} delayMS={0} />
            ) : (
              t("guide-requests-app.save", "Save")
            )}
          </Button>
        </Modal.FooterItem>
      </Modal.Footer>
      <Modal.Close
        aria-label={t("guide-requests-app.closeModal", "Close modal")}
        onClick={onClose}
      />
    </Modal>
  );
}
