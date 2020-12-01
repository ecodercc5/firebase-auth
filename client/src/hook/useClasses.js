import { useAsync } from "./useAsync";
import { classApi } from "../services/classApi";
import { useEffect, useState } from "react";

export const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const { loading, error, execute } = useAsync(
    () => classApi.getClasses(),
    [],
    { lazy: true }
  );

  useEffect(() => {
    const initClasses = () => execute();

    initClasses().then((clsses) => setClasses(clsses));
  }, [execute]);

  return { loading, error, classes };
};

export const useAddClass = () => {
  const { loading, error, execute } = useAsync(() => {}, [], { lazy: true });

  const addClass = () => {};

  return { loading, error };
};
