import { useAsync } from "./useAsync";
import { classApi } from "../services/classApi";
import { useEffect, useState } from "react";
import { useStore, useStoreValue } from "../store";

export const useClasses = () => {
  const store = useStore();
  const classes = useStoreValue("classes", []);

  const { loading, error, execute } = useAsync(
    () => classApi.getClasses(),
    [],
    { lazy: true }
  );

  useEffect(() => {
    const initClasses = () => execute();

    initClasses().then((clsses) => {
      console.log({ clsses });

      store.set("classes", clsses);
    });
  }, [execute, store]);

  return { loading, error, classes };
};

export const useAddClass = () => {
  const store = useStore();
  const addClass = async ({ name }) => {
    try {
      const newClass = await classApi.addClass({ name });

      store.update("classes", (prevClasses) => [...prevClasses, newClass]);
    } catch (err) {
      console.error(err);
    }
  };

  const { loading, error, execute } = useAsync(addClass, [], { lazy: true });

  return [execute, { loading, error }];
};

export const useJoinClass = () => {
  const store = useStore();
  const joinClass = async (classCode) => {
    try {
      const newClass = await classApi.joinClass(classCode);

      store.update("classes", (prevClasses) => addToEnd(prevClasses, newClass));
    } catch (err) {
      console.error(err);
    }
  };

  const { loading, error, execute } = useAsync(joinClass, [], { lazy: true });

  return [execute, { loading, error }];
};

// Utility Functions
const addToEnd = (arr, element) => {
  return [...arr, element];
};
