import { FieldError } from '@shadcn/components/ui/field';
import { useError } from './hooks/useError';

const ErrorMessage = () => {
	const { error } = useError();

	if (!error) return null;

	return <FieldError>{error}</FieldError>;
};

export default ErrorMessage;
