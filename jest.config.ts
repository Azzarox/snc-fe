export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.(ts|tsx)$': ['ts-jest', {
			tsconfig: 'tsconfig.test.json',
		}],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'], // moved
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@shadcn/(.*)$': '<rootDir>/@shadcn/$1',
		'\\.(gif|jpg|jpeg|png|svg|webp|avif)$':
			'<rootDir>/test/__mocks__/fileMock.ts',
	},
	roots: ['<rootDir>/src', '<rootDir>/test'],
	testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
