import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationBox = ({ onCancel, onConfirm, visisble }) => {
  return (
    <Modal isOpen={visisble}>
      <ModalHeader toggle={onCancel} />
      <ModalBody>هل أنت متأكد من حذف هذا السجل؟</ModalBody>
      <ModalFooter>
        <Button onClick={onConfirm}>نعم متأكد</Button>
        <Button onClick={onCancel}>لا</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationBox;
