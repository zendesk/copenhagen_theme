import type { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { getApolloClient } from "./apolloClient";

interface ServiceCatalogApolloProviderProps {
  children: ReactNode;
}

export function ServiceCatalogApolloProvider({
  children,
}: ServiceCatalogApolloProviderProps) {
  return <ApolloProvider client={getApolloClient()}>{children}</ApolloProvider>;
}
