import React, { useEffect, useRef } from "react";

export const useFocus = (): React.RefObject<HTMLInputElement> => {
  const ref = useRef<HTMLInputElement>(null);
  //   const ref = useRef<HTMLInputElement>(); mutable ref because we dont initialize it to null

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return ref;
};
