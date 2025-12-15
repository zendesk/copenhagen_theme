import { useState, useEffect } from "react";

export function useParams<Params>(
  initialParams: Params,
  serialize: (params: Params) => URLSearchParams,
  deserialize: (searchParams: URLSearchParams) => Partial<Params>
): {
  params: Params;
  push: (newParams: Partial<Params>) => void;
} {
  const [params, setParams] = useState<Params>(initialParams);

  function push(newParams: Partial<Params>) {
    const mergedParams = { ...params, ...newParams };
    const searchParams = serialize(mergedParams);

    setParams((prevParams) => ({ ...prevParams, ...mergedParams }));

    window.history.pushState({}, "", "?" + searchParams.toString());
  }

  function readParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const newParams = deserialize(searchParams);

    setParams((prevParams) => ({ ...prevParams, ...newParams }));
  }

  useEffect(() => {
    readParams();
  }, []);

  return {
    params,
    push,
  };
}
