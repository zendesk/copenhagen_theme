import type { RequestListParams } from "./RequestListParams";
import {
  CCD_REQUESTS_TAB_NAME,
  MY_REQUESTS_TAB_NAME,
  ORG_REQUESTS_TAB_NAME,
} from "./RequestListParams";

import { serializeRequestListParams } from "../../utils/serializeRequestListParams";
import { deserializeRequestListParams } from "../../utils/deserializeRequestListParams";

const basicParams: RequestListParams = {
  query: "test",
  page: 1,
  sort: {
    by: "created_at",
    order: "desc",
  },
  selectedTab: {
    name: ORG_REQUESTS_TAB_NAME,
    organizationId: 2,
  },
  filters: {
    created_at: ["<1week"],
    updated_at: [">=2022-07-04", "<=2022-08-04"],
  },
};

const basicSerializedParams = `query=test&page=1&sort_by=created_at&sort_order=desc&selected_tab_name=org-requests&organization_id=2&filter_created_at=${encodeURIComponent(
  "<1week"
)}&filter_updated_at=${encodeURIComponent(
  ">=2022-07-04"
)}&filter_updated_at=${encodeURIComponent("<=2022-08-04")}`;

describe("RequestListParams", () => {
  it("should serialize the parameters correctly", () => {
    const serialized = serializeRequestListParams(basicParams);

    expect(serialized.toString()).toBe(basicSerializedParams);
  });

  it("should deserialize the parameters correctly", () => {
    const searchParams = new URLSearchParams(basicSerializedParams);
    const deserialized = deserializeRequestListParams(searchParams);

    expect(deserialized).toEqual(basicParams);
  });

  it("shouldn't add sort_by and sort_order when sort is null", () => {
    const params: RequestListParams = {
      query: "",
      page: 1,
      sort: null,
      selectedTab: {
        name: MY_REQUESTS_TAB_NAME,
      },
      filters: {},
    };
    const serialized = serializeRequestListParams(params);

    expect(serialized).not.toContain("sort_by");
    expect(serialized).not.toContain("sort_order");
  });

  it("shouldn't set sort when sort_by and order_by are not present", () => {
    const searchParams = new URLSearchParams(
      "query=&page=2&selected_tab_name=ccd-requests"
    );
    const deserialized = deserializeRequestListParams(searchParams);

    const expected: Partial<RequestListParams> = {
      query: "",
      page: 2,
      selectedTab: {
        name: CCD_REQUESTS_TAB_NAME,
      },
    };

    expect(deserialized).toEqual(expected);
  });
});
