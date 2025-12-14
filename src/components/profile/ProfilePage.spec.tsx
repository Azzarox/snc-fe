import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import ProfilePage from './ProfilePage';
import { UserProfile } from '@/types/domain/user';

const useProfile = jest.fn();
const usePosts = jest.fn();
const useDetermineProfile = jest.fn();

jest.mock('@/hooks/useProfile.ts', () => ({
	useProfile: (userId: number) => useProfile(userId),
}));

jest.mock('@/hooks/usePosts.ts', () => ({
	usePosts: (userId: number) => usePosts(userId),
}));

jest.mock('@/hooks/useDetermineProfile.ts', () => ({
	useDetermineProfile: () => useDetermineProfile(),
}));

jest.mock('@/components/posts/FeedPost.tsx', () => ({
	__esModule: true,
	default: () => <div>Feed Post</div>,
}));

jest.mock('./components/ProfileAbout.tsx', () => ({
	__esModule: true,
	default: () => <div>Profile About</div>,
}));

jest.mock('./EditProfileModal.tsx', () => ({
	EditProfileModal: () => null,
}));

jest.mock('./EditProfileImageModal.tsx', () => ({
	EditProfileImageModal: () => null,
}));

jest.mock('./EditCoverImageModal.tsx', () => ({
	EditCoverImageModal: () => null,
}));

jest.mock('./ShareProfileModal.tsx', () => ({
	ShareProfileModal: () => null,
}));

const profile: UserProfile = {
	id: 1,
	userId: 1,
	username: 'test123',
	firstName: 'Test',
	lastName: 'Testing',
	bio: 'Test bio',
	avatarUrl: 'test-avatar.jpg',
	coverUrl: 'test-cover.jpg',
	createdAt: '2024-01-01T00:00:00Z',
};

describe('ProfilePage', () => {
	let user: UserEvent;

	beforeEach(() => {
		jest.clearAllMocks();
		user = userEvent.setup();

		useDetermineProfile.mockReturnValue({
			profileUserId: 1,
			isMyProfile: false,
		});

		useProfile.mockReturnValue({
			profile: profile,
			loading: false,
			refetch: jest.fn(),
		});

		usePosts.mockReturnValue({
			posts: [],
			loading: false,
			refetch: jest.fn(),
		});
	});

	describe('Component renders properly when ...', () => {
		it('should render profile information', () => {
			render(<ProfilePage />);

			const fullName = `${profile.firstName} ${profile.lastName}`;
			expect(screen.getByText(fullName)).toBeInTheDocument();
			expect(screen.getByText(`@${profile.username}`)).toBeInTheDocument();
			expect(screen.getByText(profile.bio)).toBeInTheDocument();
		});

		it('should render tabs', () => {
			render(<ProfilePage />);

			expect(screen.getByRole('button', { name: /posts/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /media/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
		});
	});

	describe('When viewing own profile ...', () => {
		it('should show edit buttons', () => {
			useDetermineProfile.mockReturnValue({
				profileUserId: 1,
				isMyProfile: true,
			});

			render(<ProfilePage />);

			expect(screen.getByRole('button', { name: /edit profile/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /edit cover/i })).toBeInTheDocument();
		});
	});

	describe("When viewing someone else's profile ...", () => {
		it('should NOT show edit buttons', () => {
			render(<ProfilePage />);

			expect(screen.queryByRole('button', { name: /edit profile/i })).not.toBeInTheDocument();
			expect(screen.queryByRole('button', { name: /edit cover/i })).not.toBeInTheDocument();
		});

		it('should show Share Profile button', () => {
			render(<ProfilePage />);

			expect(screen.getByRole('button', { name: /share profile/i })).toBeInTheDocument();
		});
	});

	describe('When tab is clicked ...', () => {
		it('should show posts tab by default', () => {
			render(<ProfilePage />);

			expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
		});

		it('should switch to About tab', async () => {
			render(<ProfilePage />);

			await user.click(screen.getByRole('button', { name: /about/i }));

			expect(screen.getByText(/profile about/i)).toBeInTheDocument();
		});
	});
});
