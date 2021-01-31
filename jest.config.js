module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(svg|png|css|scss)$": "<rootDir>/fileTransform.js",
    },
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ["./src/setupTests.ts"]
}