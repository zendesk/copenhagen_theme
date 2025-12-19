import type { PropsWithChildren, ComponentProps } from "react";
type ShadowRootContainerProps = PropsWithChildren<{
    mode: "open" | "closed";
}> & ComponentProps<"div">;
export declare function ShadowRootContainer({ mode, children, ...divProps }: ShadowRootContainerProps): JSX.Element;
export {};
