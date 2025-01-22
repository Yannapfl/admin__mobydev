import { useState } from "react";

export function useDeleteModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [target, setTarget] = useState(null);

    const openModal = (item) => {
        setTarget(item);
        setIsOpen(true);
    };

    const closeModal = () => {
        setTarget(null);
        setIsOpen(false);
    };

    return {
        isOpen,
        target,
        openModal,
        closeModal,
    };
}