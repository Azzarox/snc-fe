import { useRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';

type UseConfirmModalProps = {
	onConfirm: () => void | Promise<void>;
	onCancel?: () => void;
};

export const useConfirmModal = ({
	onConfirm,
	onCancel,
}: UseConfirmModalProps) => {
	const modalRef = useRef<ModalImperativeHandle>(null);

	const openModal = () => {
		modalRef.current?.openModal();
	};

	const closeModal = () => {
		modalRef.current?.closeModal();
		onCancel?.();
	};

	const handleConfirm = async () => {
		await onConfirm();
	};

	return {
		modalRef,
		openModal,
		closeModal,
		handleConfirm,
	};
};
