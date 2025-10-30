import { registerSchema, type RegisterFormData } from '@/schemas/auth/registerSchema';
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

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toastService } from '@/services/common/toastService';
import { useAuthService } from '@/hooks/useAuthService';

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: "onTouched",
	});

	const navigate = useNavigate();
	const [errorsState, setErrorsState] = useState([] as string[]);

	const { registerUser } = useAuthService();

	const onSubmit = async (data: RegisterFormData) => {
		const res = await registerUser(data);
		
		if (!res.success && res.errors) {
			setErrorsState(errorsState);
			return;
		}

		if (!res.success) {
			setErrorsState([res.message ?? '']);
			return;
		}

		toastService.success('Successfully created user! Redirecting to login!')
		navigate('/login');
	}

	return (

		<Card {...props}>
			<CardHeader>

				{/* TODO: Remove later */} <CardDescription className='text-red-500 text-xl'>{errorsState}</CardDescription>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						{/* <Field>
							<FieldLabel htmlFor="name">Full Name</FieldLabel>
							<Input
								id="name"
								type="text"
								placeholder="John Doe"
								required
							/>
						</Field> */}
						<Field>
							<FieldLabel htmlFor="username">Username</FieldLabel>
							<Input
								id="username"
								type="username"
								placeholder="ex: guitarhero688"
								{...register("username")}
								required
							/>
							{errors.username &&
								<>
									<FieldDescription className='text-red-500'>{errors.username.message}</FieldDescription>
								</>}
							{/* <FieldDescription>
								We&apos;ll use this to contact you. We will not
								share your email with anyone else.
							</FieldDescription> */}
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input id="password" type="password" required {...register("password")} />
							{/* <FieldDescription>
								Must be at least 8 characters long.
							</FieldDescription> */}
							{errors.password && <FieldDescription className='text-red-500'>
								{errors.password.message}
							</FieldDescription>}
						</Field>
						{/* <Field>
							<FieldLabel htmlFor="confirm-password">
								Confirm Password
							</FieldLabel>
							<Input
								id="confirm-password"
								type="password"
								required
							/>
							<FieldDescription>
								Please confirm your password.
							</FieldDescription>
						</Field> */}
						<FieldGroup>
							<Field>

								<Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
									{isSubmitting ? "Creating..." : "Create Account"}
								</Button>
								{/* <Button variant="outline" type="button">
									Sign up with Google
								</Button> */}
								<FieldDescription className="px-6 text-center">
									Already have an account?{' '}
									<Link to="/login">Sign in</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
