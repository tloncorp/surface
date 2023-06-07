import React, { useMemo } from "react";
import { PropsWithChildren, useState } from "react";

interface InteractionContextValue {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

/**
 * This context is used to track whether there is a drag interaction in progress.
 * This prevents `iframe`s from eating mouse events when the user tries to drag over or past them.
 */
export const InteractionContext = React.createContext<InteractionContextValue>({
  isDragging: false,
  setIsDragging: () => {
    /* noop */
  },
});

export const InteractionContextProvider = ({ children }: PropsWithChildren) => {
  const [isDragging, setIsDragging] = useState(false);
  const value = useMemo(() => ({ isDragging, setIsDragging }), [isDragging]);
  return <InteractionContext.Provider value={value} children={children} />;
};
