import { useFileInput } from './hooks/useFileInput';

const FileInput = () => {
	const { fileInputRef, handleFileSelect } = useFileInput();

	return <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />;
};

export default FileInput;
