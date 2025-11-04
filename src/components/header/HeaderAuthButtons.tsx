import { useAuth } from '@/context/AuthContext';
import { Button } from '@shadcn/components/ui/button';
import { Link } from 'react-router';
import AvatarProfileDropdown from '../profile/AvatarProfileDropdown';

const HeaderAuthButtons = () => {
	const { user } = useAuth();

	return (
		<>
			{user && user.id ? (
				<>
					<AvatarProfileDropdown />
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
