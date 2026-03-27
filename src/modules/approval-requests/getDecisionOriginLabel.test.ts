import { getDecisionOriginLabel } from "./getDecisionOriginLabel";
import { APPROVAL_DECISION_ORIGINATIONS } from "./constants";

describe("getDecisionOriginLabel", () => {
  const mockT = (key: string, defaultValue: string) => defaultValue;

  it('returns "via Slack" when origination_type is SLACK_ORIGINATION', () => {
    const result = getDecisionOriginLabel(
      APPROVAL_DECISION_ORIGINATIONS.SLACK,
      mockT
    );
    expect(result).toBe("via Slack");
  });

  it('returns "via Zendesk" when origination_type is UI_ORIGINATION', () => {
    const result = getDecisionOriginLabel(
      APPROVAL_DECISION_ORIGINATIONS.UI,
      mockT
    );
    expect(result).toBe("via Zendesk");
  });

  it("returns empty string when origination_type is undefined", () => {
    const result = getDecisionOriginLabel(undefined, mockT);
    expect(result).toBe("");
  });

  it("returns empty string when origination_type is an unknown value", () => {
    const result = getDecisionOriginLabel("UNKNOWN_ORIGINATION", mockT);
    expect(result).toBe("");
  });

  it("returns empty string when origination_type is an empty string", () => {
    const result = getDecisionOriginLabel("", mockT);
    expect(result).toBe("");
  });
});
