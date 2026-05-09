'use client';

import { createContext, type ReactNode, useContext, useEffect } from 'react';

export type LogBackHandler = () => void | Promise<void>;

const LogBackContext = createContext<
  ((handler: LogBackHandler | null) => void) | null
>(null);

export function LogBackProvider({
  children,
  registerHandler,
}: {
  children: ReactNode;
  registerHandler: (handler: LogBackHandler | null) => void;
}) {
  return (
    <LogBackContext.Provider value={registerHandler}>
      {children}
    </LogBackContext.Provider>
  );
}

export function useLogBackHandlerRegistration(handler: LogBackHandler | null) {
  const registerHandler = useContext(LogBackContext);

  useEffect(() => {
    if (!registerHandler) return;

    registerHandler(handler);

    return () => {
      registerHandler(null);
    };
  }, [registerHandler, handler]);
}
