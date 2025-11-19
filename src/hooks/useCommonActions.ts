import { useNavigate } from 'react-router-dom';

export const useCommonActions = () => {
	const navigate = useNavigate();

	const handleNavigateToProfile =
		(userId: number) => (e: React.MouseEvent) => {
			e.stopPropagation();
			navigate(`/profile/${userId}`);
		};

	return {
		handleNavigateToProfile,
	};
};
