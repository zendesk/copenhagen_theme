import type { ReactNode } from "react";
import * as React from "react";
import { useTranslation } from "react-i18next";

const ErrorScreen = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("cph-theme-error-boundary.title", "Something went wrong.")}</h1>
      <p>{t("cph-theme-error-boundary.message", "Please try again later")}</p>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundaryClass extends React.Component<
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

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (error) {
      console.error("ErrorBoundary caught an error", error, errorInfo);
    }
  }

  override render(): React.ReactNode {
    if (this.state.error) {
      return this.props.fallback || <ErrorScreen />;
    }
    return this.props.children;
  }
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  return (
    <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>
  );
};
