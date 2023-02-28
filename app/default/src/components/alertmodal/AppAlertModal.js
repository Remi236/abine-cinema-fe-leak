import React from 'react';
import { Modal, Alert } from 'react-bootstrap';

function AppAlertModal({ content, heading, color, isShow, onClose }) {
  //   const [show, setShow] = useState(isShow);
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal show={isShow} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant={color}>
          <p>{content}</p>
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

export default AppAlertModal;
