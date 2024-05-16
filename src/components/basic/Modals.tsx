import React, { useEffect } from 'react';
import { IMessage } from '../../utils/interfaces';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

interface IModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  item: IMessage;
}

export const ModalEditMessage: React.FC<IModalProps> = ({
  item,
  show,
  onClose,
  onConfirm,
}) => {
  const [message, setMessage] = React.useState<string>(item.message);

  useEffect(() => {
    setMessage(item.message);
  }, [item]);
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ background: '#212e35' }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: 'white' }}
        >
          Edit Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#212e35' }}>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    background: '#015c4b',
                    color: 'white',
                    border: 'none',
                  }}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ background: '#212e35' }}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onConfirm(message)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
