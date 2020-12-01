import { useState, useCallback, useRef, useEffect } from "react";

export function useAsync(
  fn,
  deps = [],
  { lazy = false, onResolve = () => {}, onReject = () => {} } = {}
) {
  const [loading, setLoading] = useState(lazy ? false : true);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  const promiseFnRef = useRef(fn);

  const execute = useCallback((args) => {
    setLoading(true);
    return promiseFnRef
      .current(args)
      .then((x) => {
        setData(x);
        onResolve(x);

        return x;
      })
      .catch((err) => {
        setError(err);
        onReject(err);

        return err;
      })
      .finally((data) => {
        setLoading(false);

        if (data instanceof Error) {
          return Promise.reject(data);
        }

        return data;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    promiseFnRef.current = fn;

    if (lazy) return;

    execute();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, lazy]);

  return { loading, error, data, execute };
}
