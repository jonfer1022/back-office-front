import React, { useContext, useEffect, useState } from 'react';
import { Container, InputGroup, Form } from 'react-bootstrap';
import CardContacts from '../basic/CardContacts';
import { Error, IContacts } from '../../utils/interfaces';
import { ArrowClockwise, PersonCircle } from 'react-bootstrap-icons';
import { AccountContext } from '../../Context/providers/account.provider';
import { LoadingContext } from '../../Context/providers/loading.provider';
import Loading from '../basic/Loading';

interface IContactsContainerProps {
  users: IContacts[];
  search: string;
  onRefresh: () => void;
  setSearch: (search: string) => void;
  setError?: (error: Error) => void;
}
const ContactsContainer: React.FC<IContactsContainerProps> = ({
  users,
  search,
  setSearch,
  onRefresh,
}) => {
  const { account } = useContext(AccountContext);
  const [contacts, setContacts] = useState<IContacts[]>(users);
  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    if (users?.length) setContacts(users);
  }, [users]);

  return (
    <Container className="p-0 h-100">
      <div className="d-flex flex-column h-100 overflow-scroll">
        <div
          className="col-12 d-flex justify-content-start p-2 px-4"
          style={{ background: '#111b21' }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <PersonCircle color="#aebac1" size={40} />
          </div>
          <div className="col-10 d-flex justify-content-start align-items-center">
            <p className="m-0 text-white text-start p-2">{`(You) ${account?.name}`}</p>
          </div>
          <button
            className="d-flex justify-content-center align-items-center btn shadow-none px-1"
            onClick={onRefresh}
          >
            <ArrowClockwise color="#aebac1" size={27} />
          </button>
        </div>
        <div className="col-12 d-flex justify-content-center p-2 px-2">
          <InputGroup className="mb-0">
            <Form.Control
              className="border-secondary-subtle text-white"
              style={{ background: '#1f2c33' }}
              aria-describedby="basic-addon1"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
        {loading.value && loading.location === 'contacts' ? (
          <div className="w-100 d-flex justify-content-center align-items-center h-100">
            <Loading />
          </div>
        ) : (
          <div className="col-12 d-flex flex-column justify-content-start align-items-center overflow-scroll h-100">
            {contacts.map((contact: any) => (
              <CardContacts key={contact.userId} item={contact} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ContactsContainer;
