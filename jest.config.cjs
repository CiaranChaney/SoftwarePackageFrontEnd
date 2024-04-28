// jest.config.cjs
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    roots: ['<rootDir>/src']
};
