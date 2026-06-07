import { getDecisionOriginLabel } from "./getDecisionOriginLabel";
import { APPROVAL_DECISION_ORIGINATIONS } from "./constants";

describe("getDecisionOriginLabel", () => {
  const mockT = (
    key: string,
    defaultValue: string,
    options?: { date: string }
  ) => defaultValue.replace("{{date}}", options?.date ?? "");

  const testDate = "January 15, 2025";

  it('returns "{{date}} via Slack" when origination_type is SLACK_ORIGINATION', () => {
    const result = getDecisionOriginLabel(
      APPROVAL_DECISION_ORIGINATIONS.SLACK,
      testDate,
      mockT
    );
    expect(result).toBe("January 15, 2025 via Slack");
  });

  it('returns "{{date}} via Zendesk" when origination_type is UI_ORIGINATION', () => {
    const result = getDecisionOriginLabel(
      APPROVAL_DECISION_ORIGINATIONS.UI,
      testDate,
      mockT
    );
    expect(result).toBe("January 15, 2025 via Zendesk");
  });

  it("returns empty string when origination_type is undefined", () => {
    const result = getDecisionOriginLabel(undefined, testDate, mockT);
    expect(result).toBe("");
  });

  it("returns empty string when origination_type is an unknown value", () => {
    const result = getDecisionOriginLabel(
      "UNKNOWN_ORIGINATION",
      testDate,
      mockT
    );
    expect(result).toBe("");
  });

  it("returns empty string when origination_type is an empty string", () => {
    const result = getDecisionOriginLabel("", testDate, mockT);
    expect(result).toBe("");
  });
});
