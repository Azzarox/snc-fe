import { Outlet } from 'react-router';
import Header from '../header/Header';
import { Toaster } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

const Layout = () => {

	return (
		<>
			<Header />

			<main>
				<Outlet />
			</main>
			<Toaster richColors position="bottom-right" closeButton/>
		</>
	);
};

export default Layout;
