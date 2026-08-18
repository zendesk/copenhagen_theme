import { useState, useEffect, useRef, useCallback } from "react";

/* Merge URL-derived params over defaults. Defaults to { ...defaultParams, ...urlParams }
   Writes resolved params back to the URL once on mount via replaceState
   Re-resolves params from the URL on Back/Forward navigation */
export interface UseParamsOptions<Params> {
  resolve?: (
    defaultParams: Params,
    urlParams: Partial<Params>,
    searchParams: URLSearchParams
  ) => Params;
  replaceUrlOnMount?: boolean;
  syncOnPopState?: boolean;
}

export interface UseParamsResult<Params> {
  params: Params;
  push: (newParams: Partial<Params>, options?: { replace?: boolean }) => void;
}

function writeUrl(searchParams: URLSearchParams, replace: boolean): void {
  const url = `${window.location.pathname}?${searchParams.toString()}${
    window.location.hash
  }`;

  if (replace) {
    window.history.replaceState({}, "", url);
  } else {
    window.history.pushState({}, "", url);
  }
}

function resolveParamsFromUrl<Params>(
  defaultParams: Params,
  deserialize: (searchParams: URLSearchParams) => Partial<Params>,
  resolve: UseParamsOptions<Params>["resolve"]
): Params {
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = deserialize(searchParams);

  return resolve
    ? resolve(defaultParams, urlParams, searchParams)
    : { ...defaultParams, ...urlParams };
}

export function useParams<Params>(
  defaultParams: Params,
  serialize: (params: Params) => URLSearchParams,
  deserialize: (searchParams: URLSearchParams) => Partial<Params>,
  options?: UseParamsOptions<Params>
): UseParamsResult<Params> {
  const [params, setParams] = useState<Params>(() =>
    resolveParamsFromUrl(defaultParams, deserialize, options?.resolve)
  );

  // Mirror the latest render values so `push` and the popstate handler can stay stable.
  const latest = useRef({
    defaultParams,
    serialize,
    deserialize,
    params,
    resolve: options?.resolve,
  });

  latest.current = {
    defaultParams,
    serialize,
    deserialize,
    params,
    resolve: options?.resolve,
  };

  const push = useCallback(
    (newParams: Partial<Params>, pushOptions?: { replace?: boolean }) => {
      const mergedParams = { ...latest.current.params, ...newParams };

      latest.current.params = mergedParams;
      setParams(mergedParams);
      writeUrl(
        latest.current.serialize(mergedParams),
        pushOptions?.replace === true
      );
    },
    []
  );

  const replaceUrlOnMount = options?.replaceUrlOnMount ?? false;
  const syncOnPopState = options?.syncOnPopState ?? false;

  useEffect(() => {
    if (replaceUrlOnMount) {
      writeUrl(latest.current.serialize(latest.current.params), true);
    }

    if (!syncOnPopState) {
      return undefined;
    }

    function handlePopState() {
      const nextParams = resolveParamsFromUrl(
        latest.current.defaultParams,
        latest.current.deserialize,
        latest.current.resolve
      );

      latest.current.params = nextParams;
      setParams(nextParams);
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [replaceUrlOnMount, syncOnPopState]);

  return { params, push };
}
