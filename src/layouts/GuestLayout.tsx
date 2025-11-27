import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const GuestLayout = () => {
	const { user, token } = useAuth();

	if (user && token) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
