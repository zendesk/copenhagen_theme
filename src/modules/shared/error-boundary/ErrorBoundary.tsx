import type { ReactNode } from "react";
import * as React from "react";
import { ErrorScreen } from "./ErrorScreen";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  helpCenterPath?: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { error: error as Error };
  }

  override render(): React.ReactNode {
    if (this.state.error) {
      return (
        this.props.fallback || (
          <ErrorScreen helpCenterPath={this.props.helpCenterPath} />
        )
      );
    }
    return this.props.children;
  }
}
