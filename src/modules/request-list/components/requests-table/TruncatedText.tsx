import { Tooltip } from "@zendeskgarden/react-tooltips";
import { Ellipsis } from "@zendeskgarden/react-typography";
import type { ReactChild } from "react";

interface TruncatedTextProps {
  children: ReactChild;
  tooltip?: string;
}

export function TruncatedText({
  children,
  tooltip,
}: TruncatedTextProps): JSX.Element {
  return (
    <Tooltip content={tooltip ? tooltip : children} size="medium">
      <Ellipsis title="">{children}</Ellipsis>
    </Tooltip>
  );
}
