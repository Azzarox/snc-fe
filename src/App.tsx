import { useState } from 'react';

import './App.css';
import RegisterPage from './components/auth/Register/RegisterPage';
import LoginPage from './components/auth/Login/LoginPage';
import { Route, Routes } from 'react-router';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
function App() {
	const [count, setCount] = useState(0);
	const [msg, setMsg] = useState('');
	// useEffect(() => {
	//     fetch('/@api/hello').then(res => res.json()).then(res => setMsg(res.msg)).catch((err) => console.error('something went wrong'))
	// }, [])

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Route>
		</Routes>
	);
}

export default App;
