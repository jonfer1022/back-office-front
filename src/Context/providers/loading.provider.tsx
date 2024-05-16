import React from 'react';
import { createContext, useState } from 'react';

export type LoadingContextType = {
  loading: { value: boolean; location?: string };
  setLoading: (loading: boolean, location?: string) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  loading: { value: false },
  setLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState({ value: false, location: '' });

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading(value, location) {
          setLoading({ value, location: location || '' });
        },
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
