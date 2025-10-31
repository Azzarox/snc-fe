import { cn } from '@shadcn/lib/utils';
import { Button } from '@shadcn/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@shadcn/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@shadcn/components/ui/field';
import { Input } from '@shadcn/components/ui/input';
import { loginSchema, type LoginFormData } from '@/schemas/auth/registerSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { authService } from '@/services/auth/authService';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const { login } = useAuth();
	const [errorsState, setErrorsState] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onTouched',
	});

	const navigate = useNavigate();

	const onSubmit = async (data: LoginFormData) => {
		const res = await authService.loginUser(data);
		if (!res.success && res.errors) {
			setErrorsState(errorsState);
			return;
		}

		if (!res.success) {
			setErrorsState([res.message]);
			return;
		}

		login(res.data!.accessToken);

		navigate('/');
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					{/* TODO: Remove later */}{' '}
					<CardDescription className="text-red-500 text-xl">
						{errorsState}
					</CardDescription>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your username below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="username">
									Username
								</FieldLabel>
								<Input
									id="username"
									type="username"
									placeholder="ex: guitarhero688"
									{...register('username')}
									required
								/>
								{errors.username && (
									<>
										<FieldDescription className="text-red-500">
											{errors.username.message}
										</FieldDescription>
									</>
								)}
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">
										Password
									</FieldLabel>
									{/* <a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a> */}
								</div>
								<Input
									id="password"
									type="password"
									{...register('password')}
									required
								/>
								{errors.password && (
									<>
										<FieldDescription className="text-red-500">
											{errors.password.message}
										</FieldDescription>
									</>
								)}
							</Field>
							<Field>
								<Button
									className="cursor-pointer"
									type="submit"
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Loading...' : 'Login'}
								</Button>
								{/* <Button variant="outline" type="button">
									Login with Google
								</Button> */}
								<FieldDescription className="text-center">
									Don&apos;t have an account?{' '}
									<Link to="/register">Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
