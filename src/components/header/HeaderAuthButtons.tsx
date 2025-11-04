import { useAuth } from '@/context/AuthContext';
import { Button } from '@shadcn/components/ui/button';
import { useNavigate, Link } from 'react-router';

const HeaderAuthButtons = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleOnLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<>
			{user && user.username ? (
				<>
					<Link to={'/login'}>
						<Button
							onClick={handleOnLogout}
							className="cursor-pointer"
							variant="outline"
						>
							Logout
						</Button>
					</Link>
				</>
			) : (
				<>
					<Link to={'/login'}>
						<Button className="cursor-pointer" variant="outline">
							Sign In
						</Button>
					</Link>
					<Link to={'/register'}>
						<Button className="cursor-pointer">Join Now</Button>
					</Link>
				</>
			)}
		</>
	);
};

export default HeaderAuthButtons;
