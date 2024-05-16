/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { IMessage } from '../../utils/interfaces';
import { Col, Dropdown } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

interface ICardMessagesProps {
  item: IMessage;
  userId: string;
  onDelete: (message: IMessage) => void;
  onEdit: (message: IMessage) => void;
}

const CustomToggle = React.forwardRef<HTMLAnchorElement, any>(
  ({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ),
);

const CardMessages: React.FC<ICardMessagesProps> = ({
  item,
  userId,
  onDelete,
  onEdit,
}) => {
  const isReceiver = item.receiverId === userId;

  return (
    <div
      className={`w-100 p-1 px-3 d-flex align-items-center ${isReceiver ? 'justify-content-start' : 'justify-content-end'}`}
    >
      <Col
        className={`col-10 p-2 ${isReceiver ? 'text-start' : 'text-end'} rounded d-flex justify-content-between`}
        style={{
          background: `${isReceiver ? '#111b21' : '#015c4b'}`,
        }}
      >
        <div>
          <p className={`m-0 text-white text-start`}>{item.message}</p>
        </div>
        {!isReceiver && item.status === 'unread' && (
          <div className="d-flex mx-2">
            <Dropdown
              className="d-inline"
              style={{ background: 'transparent' }}
            >
              <Dropdown.Toggle
                variant="light"
                id="dropdown-autoclose-true"
                className="border-0"
                style={{ background: 'transparent' }}
                as={CustomToggle}
              >
                <ThreeDotsVertical color="white" size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onEdit(item)}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => onDelete(item)}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </Col>
    </div>
  );
};

export default CardMessages;
