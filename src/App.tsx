import { useState } from 'react';

import './App.css';
import Home from './components/Layout/Home';
import RegisterPage from './components/auth/Register/RegisterPage';
import LoginPage from './components/auth/Login/LoginPage';
import { Route, Routes } from 'react-router';
import Layout from './components/Layout/Layout';
function App() {
	const [count, setCount] = useState(0);
	const [msg, setMsg] = useState('');
	// useEffect(() => {
	//     fetch('/@api/hello').then(res => res.json()).then(res => setMsg(res.msg)).catch((err) => console.error('something went wrong'))
	// }, [])

	return (
		<Routes>
			{/* Layout Route */}
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				{/* Add more routes as needed */}
			</Route>
		</Routes>
	);
}

export default App;
