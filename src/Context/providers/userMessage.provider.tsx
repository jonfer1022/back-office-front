import React from 'react';
import { createContext, useState } from 'react';
import { IContacts } from '../../utils/interfaces';

export type ContactsContextType = {
  contact: IContacts;
  setContact: (contacts: IContacts) => void;
};

export const ContactsContext = createContext<ContactsContextType>({
  contact: {} as IContacts,
  setContact: () => {},
});

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contact, setContact] = useState<IContacts>({} as IContacts);
  return (
    <ContactsContext.Provider value={{ contact, setContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
