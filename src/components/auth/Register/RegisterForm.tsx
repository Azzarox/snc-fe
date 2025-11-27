import { registerSchema, type RegisterFormData } from '@/schemas/auth/registerSchema';
import { Button } from '@shadcn/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcn/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@shadcn/components/ui/field';
import { Input } from '@shadcn/components/ui/input';

import { Textarea } from '@shadcn/components/ui/textarea';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toastService } from '@/services/common/toastService';
import { useAuthService } from '@/hooks/useAuthService';
import DissmissableErrorAlert from '@/components/common/DismissableErrorAlert';
import { ErrorMessages } from '@/consts/errors';

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
	const [currentStep, setCurrentStep] = useState(1);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		setError,
		trigger,
		clearErrors,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: 'onTouched',
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			bio: '',
			description: '',
		},
	});

	const navigate = useNavigate();
	const { registerUser } = useAuthService();

	const handleNext = async () => {
		// Validate only Step 1 fields
		const isValid = await trigger(['username', 'email', 'password', 'confirmPassword']);
		if (isValid) {
			setCurrentStep(2);
			clearErrors();
		}
	};

	const handleBack = () => {
		setCurrentStep(1);
		clearErrors();
	};

	const onSubmit = async (data: RegisterFormData) => {
		const res = await registerUser(data);

		if (!res.success && res.errors) {
			setError('root', res.errors);
			setCurrentStep(1);
			return;
		}

		if (!res.success) {
			setError('root', {
				message: res.message ?? ErrorMessages.UNEXPECTED_ERROR,
			});
			setCurrentStep(1);
			return;
		}

		toastService.success('Successfully created user!');
		navigate('/login');
	};

	return (
		<Card {...props} className={currentStep === 1 ? 'max-w-md mx-auto' : 'max-w-lg mx-auto'}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					{currentStep === 1 ? 'Enter your account information below' : 'Complete your profile information'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{errors.root && (
					<>
						<DissmissableErrorAlert title="Registration Failed" message={errors.root && errors.root.message} />
					</>
				)}
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						{/* Step 1: Account Credentials */}
						{currentStep === 1 && (
							<>
								<Field>
									<FieldLabel htmlFor="username">Username</FieldLabel>
									<Input
										id="username"
										type="text"
										placeholder="ex: guitarhero688"
										{...register('username')}
										required
									/>
									{errors.username && (
										<FieldDescription className="text-red-500">{errors.username.message}</FieldDescription>
									)}
								</Field>

								<Field>
									<FieldLabel htmlFor="email">Email</FieldLabel>
									<Input id="email" type="email" placeholder="your@email.com" {...register('email')} required />
									{errors.email && (
										<FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>
									)}
								</Field>

								<Field>
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Input
										id="password"
										type="password"
										placeholder="At least 6 characters"
										{...register('password')}
										required
									/>
									{errors.password && (
										<FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>
									)}
								</Field>

								<Field>
									<FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
									<Input
										id="confirmPassword"
										type="password"
										placeholder="Confirm your password"
										{...register('confirmPassword')}
										required
									/>
									{errors.confirmPassword && (
										<FieldDescription className="text-red-500">
											{errors.confirmPassword.message}
										</FieldDescription>
									)}
								</Field>
							</>
						)}

						{/* Step 2: Profile Information */}
						{currentStep === 2 && (
							<>
								<div className="grid grid-cols-2 gap-4">
									<Field>
										<FieldLabel htmlFor="firstName">First Name</FieldLabel>
										<Input
											id="firstName"
											type="text"
											placeholder="John"
											{...register('firstName')}
											required
										/>
										{errors.firstName && (
											<FieldDescription className="text-red-500">
												{errors.firstName.message}
											</FieldDescription>
										)}
									</Field>

									<Field>
										<FieldLabel htmlFor="lastName">Last Name</FieldLabel>
										<Input id="lastName" type="text" placeholder="Doe" {...register('lastName')} required />
										{errors.lastName && (
											<FieldDescription className="text-red-500">
												{errors.lastName.message}
											</FieldDescription>
										)}
									</Field>
								</div>

								<Field>
									<FieldLabel htmlFor="bio">Bio</FieldLabel>
									<Input
										id="bio"
										type="text"
										placeholder="e.g., Jazz guitarist from NYC"
										{...register('bio')}
									/>

									<FieldDescription className={errors.bio && 'text-red-500'}>
										{errors.bio ? (
											<>{errors.bio.message}</>
										) : (
											<>Optional: Tell us about yourself in few words (max 120 characters)</>
										)}
									</FieldDescription>
								</Field>

								<Field>
									<FieldLabel htmlFor="description">Description</FieldLabel>
									<Textarea
										id="description"
										placeholder="Tell us about yourself..."
										{...register('description')}
									/>
									<FieldDescription className={errors.description && 'text-red-500'}>
										{errors.description ? (
											<>{errors.description.message}</>
										) : (
											<>Optional: Share more about your musical journey</>
										)}
									</FieldDescription>
								</Field>

								{/* <Field>
									<FieldLabel htmlFor="primarySkill">Primary Skill</FieldLabel>
									<Controller
										name="primarySkill"
										control={control}
										render={({ field }) => (
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger id="primarySkill">
													<SelectValue placeholder="Select your primary skill" />
												</SelectTrigger>
												<SelectContent>
													{GUITAR_SKILLS.map((skill) => (
														<SelectItem key={skill} value={skill}>
															{skill}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
									{errors.primarySkill && (
										<FieldDescription className="text-red-500">
											{errors.primarySkill.message}
										</FieldDescription>
									)}
								</Field>

								<Field>
									<FieldLabel htmlFor="yearsExperience">
										Years of Experience
									</FieldLabel>
									<Controller
										name="yearsExperience"
										control={control}
										render={({ field }) => (
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger id="yearsExperience">
													<SelectValue placeholder="Select your experience level" />
												</SelectTrigger>
												<SelectContent>
													{EXPERIENCE_LEVELS.map((level) => (
														<SelectItem key={level.value} value={level.value}>
															{level.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
									{errors.yearsExperience && (
										<FieldDescription className="text-red-500">
											{errors.yearsExperience.message}
										</FieldDescription>
									)}
								</Field> */}
							</>
						)}

						<FieldGroup>
							<Field>
								{currentStep === 1 ? (
									<Button className="cursor-pointer" type="button" onClick={handleNext}>
										Next
									</Button>
								) : (
									<div className="flex gap-2">
										<Button className="cursor-pointer" variant="outline" type="button" onClick={handleBack}>
											Back
										</Button>
										<Button className="cursor-pointer flex-1" type="submit" disabled={isSubmitting}>
											{isSubmitting ? 'Creating...' : 'Create Account'}
										</Button>
									</div>
								)}
								<FieldDescription className="px-6 text-center">
									Already have an account? <Link to="/login">Sign in</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
