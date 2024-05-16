import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { IUser } from '../../utils/interfaces';

export type AccountContextType = {
  account: IUser;
  setAccount: (contacts: IUser) => void;
};

export const AccountContext = createContext<AccountContextType>({
  account: {} as IUser,
  setAccount: () => {},
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<IUser>({} as IUser);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setAccount(JSON.parse(user));
  }, []);
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
