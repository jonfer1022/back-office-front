/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import ContactsContainer from '../components/layout/ContactsContainer';
import MessagesContainer from '../components/layout/MessagesContainer';
import axiosInstance from '../utils/fetcher';
import { Error, IContacts, IMessage } from '../utils/interfaces';
import { ContactsContext } from '../Context/providers/userMessage.provider';
import { AccountContext } from '../Context/providers/account.provider';
import { ModalEditMessage } from '../components/basic/Modals';
import Loading from '../components/basic/Loading';
import { LoadingContext } from '../Context/providers/loading.provider';

interface IHomeProps {
  setError: (error: Error) => void;
}

const Home: React.FC<IHomeProps> = ({ setError }) => {
  const { account } = useContext(AccountContext);
  const { contact, setContact } = useContext(ContactsContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [users, setUsers] = useState<IContacts[]>([]);
  const [search, setSearch] = useState<string>('');
  const [msgUser, setMsgUser] = useState([] as IMessage[]);
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState({} as IMessage);

  useEffect(() => {
    setLoading(true, 'home');
    getUsers();
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoading(true, 'contacts');
      getUsers();
    }, 400);
    return () => clearTimeout(timeOutId);
  }, [search]);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get<IContacts[]>(
        'users?search=' + search,
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };

  const getMessageByUserId = async () => {
    try {
      const response = await axiosInstance.get<IMessage[]>(
        'users/' + contact.userId + '/messages',
      );
      setMsgUser(response.data);
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };

  const sendMessage = async (_message: string, _contact: IContacts) => {
    try {
      setLoading(true, 'messages');
      await axiosInstance.post('messages/', {
        message: _message,
        receiverId: contact.userId,
      });
      await getMessageByUserId();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };

  const changeStatusToRead = async () => {
    try {
      const msgUnread = msgUser
        .filter(
          (item: IMessage) =>
            item.receiverId === account.userId && item.status === 'unread',
        )
        .map((item: IMessage) => ({
          ...item,
          status: 'read',
          updatedAt: new Date(),
        }));

      if (!msgUnread.length) return;
      setLoading(true, 'contacts');
      await axiosInstance.put('messages', {
        messages: msgUnread,
      });
      await getUsers();
      await getMessageByUserId();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };

  const deleteMessage = async (item: IMessage) => {
    try {
      setLoading(true, 'messages');
      await axiosInstance.delete(`/messages/${item.messageId}`);
      await getMessageByUserId();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };

  const editMessage = async (message: string) => {
    try {
      setLoading(true, 'messages');
      await axiosInstance.put(`/messages/${itemSelected.messageId}`, {
        ...itemSelected,
        message,
      });
      setItemSelected({} as IMessage);
      await getMessageByUserId();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };

  useEffect(() => {
    if (Object.keys(contact).length) getMessageByUserId();
  }, [contact]);

  useEffect(() => {
    if (msgUser?.length) changeStatusToRead();
  }, [msgUser]);

  const onRefresh = () => {
    setContact({} as IContacts);
    setLoading(true, 'home');
    if (search.length) setSearch('');
    else getUsers();
  };

  return (
    <Container
      className="col-12 d-flex rounded mt-3 p-0"
      style={{ background: '#212e35', height: '90vh' }}
    >
      {loading.value && loading.location === 'home' ? (
        <div className="row h-100 w-100 d-flex justify-content-center align-items-center">
          <Loading />
        </div>
      ) : (
        <>
          <Col className="col-4 h-100 border-secondary border-end">
            <ContactsContainer
              search={search}
              onRefresh={onRefresh}
              setError={setError}
              setSearch={setSearch}
              users={users}
            />
          </Col>
          <Col className="col-8 h-100">
            <MessagesContainer
              contact={contact}
              msgUser={msgUser}
              onSend={sendMessage}
              onDelete={deleteMessage}
              onEdit={(item) => {
                setItemSelected(item);
                setShowModal(true);
              }}
            />
          </Col>
          <ModalEditMessage
            show={showModal}
            onClose={() => {
              setShowModal(false);
              setItemSelected({} as IMessage);
            }}
            item={itemSelected}
            onConfirm={(message) => {
              setShowModal(false);
              editMessage(message);
            }}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
