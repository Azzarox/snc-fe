import { Outlet } from 'react-router';
import Header from '../header/Header';
import { ErrorBoundaryWrapper } from '../common/ErrorBoundaryWrapper';

const Layout = () => {
	return (
		<>
			<Header />
			<ErrorBoundaryWrapper>
				<main>
					<Outlet />
				</main>
			</ErrorBoundaryWrapper>
		</>
	);
};

export default Layout;
