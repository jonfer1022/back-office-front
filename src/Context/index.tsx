import React from 'react';
import { ContactsProvider } from './providers/userMessage.provider';
import { AccountProvider } from './providers/account.provider';
import { LoadingProvider } from './providers/loading.provider';

const composeProviders =
  (...providers: any[]) =>
  ({ children }: any) => {
    return providers.reduceRight(
      (child, Provider) => <Provider>{child}</Provider>,
      children,
    );
  };

const Providers = composeProviders(
  ContactsProvider,
  AccountProvider,
  LoadingProvider,
);

export { Providers };
