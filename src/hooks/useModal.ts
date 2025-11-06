import { useImperativeHandle, useState, type Ref } from "react"
import type { ModalImperativeHandle } from "@/types/common/ModalImpretiveHandle"

export const useModal = (ref: Ref<ModalImperativeHandle>) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false)
    }));

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        isOpen,
        openModal,
        closeModal,
    };
};
