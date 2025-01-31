import { useState } from "react";

export function useModalManager() {
    const [modalType, setModalType] = useState(null);
    const [modalProps, setModalProps] = useState({});
  
    const openModal = (type, props) => {
      setModalType(type);
      setModalProps(props);
    };
  
    const closeModal = () => {
      setModalType(null);
      setModalProps({});
    };
  
    return {
      modalType,
      modalProps,
      openModal,
      closeModal,
    };
}
