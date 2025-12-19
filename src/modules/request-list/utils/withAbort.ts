// Returns method used to abort the request inside the wrapped function
function withAbort(wrappedFn: (signal: AbortSignal) => void): () => void {
  const requestController = new AbortController();
  const signal = requestController.signal;

  wrappedFn(signal);

  return () => requestController.abort();
}

export default withAbort;
