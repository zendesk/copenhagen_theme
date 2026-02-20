import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client/core";
import { RetryLink } from "@apollo/client/link/retry";

type ApolloClientInstance = InstanceType<typeof ApolloClient>;

interface GraphQLErrorExtensions {
  code?: string;
  response?: {
    body?: {
      error?: {
        code?: string;
      };
    };
  };
}

interface GraphQLErrorWithExtensions {
  extensions?: GraphQLErrorExtensions;
}

interface ResultWithErrors {
  errors?: readonly GraphQLErrorWithExtensions[];
  extensions?: {
    authenticated?: boolean;
  };
  result?: ResultWithErrors;
}

const GRAPHQL_ENDPOINT = "/api/graphql";
const TOKEN_STORAGE_KEY = "copenhagen_theme.authenticity_token";
const RETRY_STATUS_CODES = new Set([502, 503]);

let pendingFetch: Promise<string> | null = null;

function getToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string): void {
  try {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // sessionStorage unavailable
  }
}

function clearToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // sessionStorage unavailable
  }
}

async function fetchToken(): Promise<string> {
  if (pendingFetch) {
    return pendingFetch;
  }

  pendingFetch = (async () => {
    try {
      const response = await fetch("/api/v2/users/me/session/renew", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Token fetch failed: ${response.status}`);
      }

      const data = await response.json();
      const token =
        data.authenticity_token ??
        data.session?.authenticity_token ??
        data.user?.authenticity_token;

      if (!token) {
        throw new Error("No authenticity_token in response");
      }

      setToken(token);
      return token;
    } finally {
      pendingFetch = null;
    }
  })();

  return pendingFetch;
}

async function getOrFetchToken(): Promise<string> {
  const cached = getToken();
  if (cached) {
    return cached;
  }
  return fetchToken();
}

async function refreshToken(): Promise<string> {
  clearToken();
  return fetchToken();
}

function isInvalidTokenError(result: ResultWithErrors): boolean {
  return (
    result?.errors?.some((error) => {
      const code = error?.extensions?.code;
      const bodyCode = error?.extensions?.response?.body?.error?.code;
      return code === "FORBIDDEN" && bodyCode === "invalid_authenticity_token";
    }) ?? false
  );
}

function isUnauthenticatedError(result: ResultWithErrors): boolean {
  return (
    result?.errors?.some(
      (error) => error?.extensions?.code === "UNAUTHENTICATED"
    ) ?? false
  );
}

function redirectToSignIn(): void {
  const returnTo = encodeURIComponent(
    window.location.pathname + window.location.search
  );
  window.location.href = `/hc/signin?return_to=${returnTo}`;
}

const metaLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "apollographql-client-name": "copenhagen_theme",
      "apollographql-client-version": "1.0.0",
    },
  }));
  return forward(operation);
});

/**
 * Handles authentication:
 * - Adds X-CSRF-Token header
 * - On invalid token error: refreshes token and retries once
 * - On unauthenticated error: redirects to sign-in
 */
const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let retried = false;

    const execute = async (token: string) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          "X-CSRF-Token": token,
        },
      }));

      return forward(operation).subscribe({
        next: async (result) => {
          if (isInvalidTokenError(result) && !retried) {
            retried = true;
            try {
              const newToken = await refreshToken();
              execute(newToken);
            } catch {
              observer.next(result);
              observer.complete();
            }
            return;
          }

          if (
            isUnauthenticatedError(result) ||
            result?.extensions?.authenticated === false
          ) {
            clearToken();
            redirectToSignIn();
            return;
          }

          observer.next(result);
        },
        error: async (error) => {
          if (isInvalidTokenError(error) && !retried) {
            retried = true;
            try {
              const newToken = await refreshToken();
              execute(newToken);
            } catch {
              observer.error(error);
            }
            return;
          }

          if (isUnauthenticatedError(error?.result)) {
            clearToken();
            redirectToSignIn();
            return;
          }

          observer.error(error);
        },
        complete: () => observer.complete(),
      });
    };

    getOrFetchToken()
      .then(execute)
      .catch((error) => {
        if (error?.message?.includes("401")) {
          redirectToSignIn();
        } else {
          observer.error(error);
        }
      });
  });
});

const retryLink = new RetryLink({
  delay: { initial: 300, max: 5000, jitter: true },
  attempts: {
    max: 3,
    retryIf: (error) => {
      if (!navigator.onLine) return true;
      const networkError = error as {
        statusCode?: number;
        response?: { status?: number };
      };
      return (
        RETRY_STATUS_CODES.has(networkError?.statusCode ?? 0) ||
        RETRY_STATUS_CODES.has(networkError?.response?.status ?? 0)
      );
    },
  },
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
});

let client: ApolloClientInstance | null = null;

export function getApolloClient(): ApolloClientInstance {
  if (!client) {
    client = new ApolloClient({
      link: ApolloLink.from([metaLink, authLink, retryLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: { fetchPolicy: "cache-first" },
        query: { fetchPolicy: "cache-first" },
      },
    });
  }
  return client;
}

export function resetApolloClient(): void {
  clearToken();
  pendingFetch = null;
  if (client) {
    client.clearStore();
    client = null;
  }
}
