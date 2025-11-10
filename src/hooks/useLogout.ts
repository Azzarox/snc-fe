import { useAuth } from '@/context/AuthContext';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const useLogout = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = useCallback(() => {
		logout();
		navigate('/login');
	}, [logout, navigate])

	return {
		handleLogout,
	};
};

export default useLogout;
