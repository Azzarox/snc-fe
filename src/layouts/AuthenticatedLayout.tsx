import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PageLoader from '@/components/common/PageLoader';

export const AuthenticatedLayout = () => {
	const { user, token, loading } = useAuth();

	if (loading || (token && !user)) {
		return <PageLoader />;
	}

	if (!user || !token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};
