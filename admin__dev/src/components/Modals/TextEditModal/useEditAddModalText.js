import { useState } from "react";

export function useEditAddModalText(initialData = {}) {
    const [text, setText] = useState(initialData.text || '');
    const [editTarget, setEditTarget] = useState(initialData.editTarget || null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openAddModal = () => {
        setText("");
        setIsModalOpen(true);
      };
    
      const openEditModal = (target) => {
        setText(target.label);
        setEditTarget(target);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setEditTarget(null);
        setText("");
      };

      return {
        text,
        setText,
        editTarget,
        setEditTarget,
        isModalOpen,
        setIsModalOpen,
        openAddModal,
        openEditModal,
        closeModal,
      };
}