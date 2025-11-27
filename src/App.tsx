import './App.css';
import RegisterPage from './components/auth/Register/RegisterPage';
import LoginPage from './components/auth/Login/LoginPage';
import { Route, Routes } from 'react-router';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import NotFoundPage from './components/common/NotFoundPage';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';
import { GuestLayout } from './layouts/GuestLayout';
import { SettingsPage } from './components/settings/SettingsPage';
import { lazy } from 'react';

export const DiscoverPage = () => {
	return (
		<main className="container mx-auto px-4 py-6 max-w-7xl">
			<p>Discover Properly</p>
		</main>
	);
};

const ProfilePage = lazy(() => import('./components/profile/ProfilePage'));
const PostDetailsPage = lazy(() => import('./components/posts/PostDetailsPage'));

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* Public Routes */}
					<Route index element={<HomePage />} />

					{/* Guest Routes*/}
					<Route element={<GuestLayout />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
					</Route>

					{/* Protected Routes */}
					<Route element={<AuthenticatedLayout />}>
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/profile/:userId" element={<ProfilePage />} />
						<Route path="/settings" element={<SettingsPage />} />
						<Route path="/discover" element={<DiscoverPage />} />
						<Route path="/posts/:postId/details" element={<PostDetailsPage />} />
					</Route>

					<Route path="*" element={<NotFoundPage />}></Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
