import { Outlet } from 'react-router';
import Header from '../header/Header';
import { ErrorBoundaryWrapper } from '../common/ErrorBoundaryWrapper';
import { Toaster } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

const Layout = () => {

	return (
		<>
			<Header />
			<ErrorBoundaryWrapper>
	
			<main>
					<Outlet />
				</main>
			</ErrorBoundaryWrapper>
			<Toaster richColors position="bottom-right" closeButton/>
		</>
	);
};

export default Layout;
