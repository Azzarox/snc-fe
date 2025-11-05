import { LoginForm } from './LoginForm';

export default function LoginPage() {
	return (
		<div className="flex header-offset w-full items-center justify-center p-4 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
