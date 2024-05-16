import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { PersonCircle, EnvelopeArrowUp } from 'react-bootstrap-icons';
import { IContacts } from '../../utils/interfaces';
import { ContactsContext } from '../../Context/providers/userMessage.provider';
import { LoadingContext } from '../../Context/providers/loading.provider';

interface ICardContactsProps {
  item: IContacts;
}

const CardContacts: React.FC<ICardContactsProps> = ({ item }) => {
  const { setContact } = useContext(ContactsContext);
  const { setLoading } = useContext(LoadingContext);

  return (
    <button
      className="w-100 p-1 btn shadow-none border-bottom border-secondary d-flex align-items-center"
      style={{ background: '#111b21' }}
      onClick={() => {
        setLoading(true, 'messages');
        setContact(item);
      }}
    >
      <Col className="col-lg-2 col-md-2 d-flex justify-content-center">
        <PersonCircle color="#aebac1" size={40} />
      </Col>
      <Col className="col-8 p-3 text-start">
        <p className="m-0 text-white">{item.name || ''}</p>
      </Col>
      <Col className="col-2 d-flex justify-content-center">
        <EnvelopeArrowUp
          color={item.status ? '#f23937' : '#aebac1'}
          size={30}
        />
      </Col>
    </button>
  );
};

export default CardContacts;
