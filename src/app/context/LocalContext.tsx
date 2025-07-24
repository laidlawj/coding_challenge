'use client';
// contexts/LocaleContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Define the type for your context value
interface LocaleContextType {
  locale: string;
}

// Create the context with a default undefined value
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Create a custom hook to easily consume the context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// Create a Provider component to wrap your application
interface LocaleProviderProps {
  children: ReactNode;
  locale: string;
}

export const LocaleProvider = ({ children, locale }: LocaleProviderProps) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
};