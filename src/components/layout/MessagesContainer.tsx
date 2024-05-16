/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useRef, useEffect } from 'react';
import { IContacts, IMessage } from '../../utils/interfaces';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { EnvelopePaper, PersonCircle, Send } from 'react-bootstrap-icons';
import { AccountContext } from '../../Context/providers/account.provider';
import { LoadingContext } from '../../Context/providers/loading.provider';
import Loading from '../basic/Loading';
import CardMessages from '../basic/CardMessages';

interface IMessagesContainerProps {
  contact: IContacts;
  msgUser: IMessage[];
  onSend: (message: string, contact: IContacts) => void;
  onDelete: (message: IMessage) => void;
  onEdit: (message: IMessage) => void;
}

const MessagesContainer: React.FC<IMessagesContainerProps> = ({
  contact,
  msgUser,
  onSend,
  onDelete,
  onEdit,
}) => {
  const { loading } = useContext(LoadingContext);
  const ref = useRef<HTMLDivElement>(null);
  const { account } = useContext(AccountContext);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current?.scrollHeight);
  }, [msgUser]);

  return (
    <Container className="p-0 h-100">
      {!Object.keys(contact).length ? (
        <div className="row h-100 d-flex flex-column justify-content-center align-items-center">
          <EnvelopePaper size={80} color="#aebac1" />
        </div>
      ) : (
        <div className="h-100 d-flex flex-column justify-content-end">
          <div
            className="col-12 d-flex justify-content-end p-2"
            style={{ background: '#111b21' }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <PersonCircle color="#aebac1" size={40} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="m-0 text-white text-start p-2">{contact.name}</p>
            </div>
          </div>
          {loading.value && loading.location === 'messages' ? (
            <div className="w-100 d-flex justify-content-center align-items-center h-100">
              <Loading />
            </div>
          ) : (
            <>
              <div className="w-100 overflow-auto h-100 mt-1" ref={ref}>
                {msgUser?.map((item: IMessage, i) => (
                  <CardMessages
                    key={i}
                    item={item}
                    userId={account.userId}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))}
              </div>
              <div
                className="col-12 d-flex justify-content-between mt-1 p-2"
                style={{ background: '#111b21' }}
              >
                <InputGroup className="mb-0">
                  <Form.Control
                    className="border border-secondary-subtle text-white"
                    style={{ background: '#1f2c33' }}
                    aria-describedby="basic-addon1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </InputGroup>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onSend(message, contact);
                    setMessage('');
                  }}
                >
                  <Send size={20} color="#aebac1" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default MessagesContainer;
