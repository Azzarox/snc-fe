import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { EditProfileModal } from './EditProfileModal';
import { UserProfile } from '@/types/domain/user';

const profile: UserProfile = {
	id: 1,
	userId: 1,
	username: 'test123',
	firstName: 'Test',
	lastName: 'Testing',
	bio: 'Test bio',
	description: 'Test description',
	avatarUrl: 'avatar.jpg',
	coverUrl: 'cover.jpg',
	createdAt: '2023-01-15T00:00:00Z',
};

const useProfileService = {
	updateUserProfile: jest.fn(),
};

const useModalMocks = {
	isOpen: true,
	closeModal: jest.fn(),
};

const useModal = jest.fn();

jest.mock('@/hooks/useProfileService', () => ({
	useProfileService: () => useProfileService,
}));

jest.mock('@/hooks/useModal', () => ({
	useModal: (ref: any) => useModal(ref),
}));

jest.mock('@/services/common/toastService', () => ({
	toastService: {
		success: jest.fn(),
	},
}));

describe('EditProfileModal', () => {
	let user: UserEvent;
	let ref: any;
	let onSuccess: jest.Mock;
	beforeEach(() => {
		jest.clearAllMocks();
		onSuccess = jest.fn();
		user = userEvent.setup();
		ref = { current: null };

		useModal.mockReturnValue(useModalMocks);
	});

	it('should render form with prefilled profile data', () => {
		render(<EditProfileModal ref={ref} profile={profile} onSuccess={onSuccess} />);

		expect(screen.getByLabelText(/first name/i)).toHaveValue(profile.firstName);
		expect(screen.getByLabelText(/last name/i)).toHaveValue(profile.lastName);
		expect(screen.getByLabelText(/bio/i)).toHaveValue(profile.bio);
		expect(screen.getByLabelText(/description/i)).toHaveValue(profile.description);
	});

	it('should render "Save Changes" and "Cancel" buttons', () => {
		render(<EditProfileModal ref={ref} profile={profile} onSuccess={onSuccess} />);

		expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
	});

	it('should call "updateUserProfile" and "onSuccess" when form is submitted SUCCESSFULLY', async () => {
		useProfileService.updateUserProfile.mockResolvedValue({
			success: true,
		});

		render(<EditProfileModal ref={ref} profile={profile} onSuccess={onSuccess} />);

		const firstNameInput = screen.getByLabelText(/first name/i);
		await user.clear(firstNameInput);
		await user.type(firstNameInput, 'Updated');

		await user.click(screen.getByRole('button', { name: /save changes/i }));

		await waitFor(() => {
			expect(useProfileService.updateUserProfile).toHaveBeenCalledWith({
				firstName: 'Updated',
				lastName: 'Testing',
				bio: 'Test bio',
				description: 'Test description',
			});
			expect(onSuccess).toHaveBeenCalled();
			expect(useModalMocks.closeModal).toHaveBeenCalled();
		});
	});

	it('should not call "onSuccess" or close modal when submit FAILS', async () => {
		useProfileService.updateUserProfile.mockResolvedValue({
			success: false,
			message: 'Update failed',
		});

		render(<EditProfileModal ref={ref} profile={profile} onSuccess={onSuccess} />);

		await user.click(screen.getByRole('button', { name: /save changes/i }));

		await waitFor(() => {
			expect(useProfileService.updateUserProfile).toHaveBeenCalled();
			expect(onSuccess).not.toHaveBeenCalled();
			expect(useModalMocks.closeModal).not.toHaveBeenCalled();
		});
	});

	it('should close modal when "Cancel" button is clicked', async () => {
		render(<EditProfileModal ref={ref} profile={profile} onSuccess={onSuccess} />);

		await user.click(screen.getByRole('button', { name: /cancel/i }));

		expect(useModalMocks.closeModal).toHaveBeenCalled();
	});
});
