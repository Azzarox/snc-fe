import './App.css';
import RegisterPage from './components/auth/Register/RegisterPage';
import LoginPage from './components/auth/Login/LoginPage';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import NotFoundPage from './components/common/NotFoundPage';

import { useAuth } from './context/AuthContext';

export const DiscoverPage = () => {
	const { user } = useAuth()

	if (!user) {
		return <Navigate to="/login" />
	}

	return <main className="container mx-auto px-4 py-6 max-w-7xl">
		<p>Discover Properly</p>
	</main>
}

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/discover" element={<DiscoverPage />} />
				</Route>
			<Route path="*" element={<NotFoundPage />}></Route>
			</Routes>
		</>
	);
}

export default App;
