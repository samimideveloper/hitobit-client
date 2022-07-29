module.exports = {
  jest: function (config) {
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    // if (!config.testPathIgnorePatterns) {
    //   config.testPathIgnorePatterns = [];
    // }
    // if (!process.env.RUN_COMPONENT_TESTS) {
    //   config.testPathIgnorePatterns.push(
    //     '<rootDir>/src/components/**/*.test.js',
    //   );
    // }
    // if (!process.env.RUN_REDUCER_TESTS) {
    //   config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
    // }
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const __STAGE__ = Boolean(process.env.__STAGE__);

    config.globals = {
      ...config.globals,
      __DEV__: true,
      __MOCK__: true,
      __CLIENT_SECRET__: `"${clientSecret}"`,
      __CLIENT_ID__: `"${clientId}"`,
      __STAGE__,
      __STAGE_TEST__: false,
      __TESTNET__: false,
      __PLATFORM__: "web",
    };
    config.modulePaths = [
      ...config.modulePaths,
      // "<rootDir>/node_modules/lodash-es",
    ];

    config.transformIgnorePatterns = [
      // ...config.transformIgnorePatterns,
      "/node_modules/(?!(lodash-es|reactjs-view-core|reactjs-view|reactjs-view-share)/.*)",
    ];

    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    };

    return config;
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function (paths, env) {
    // ...add your paths config
    return paths;
  },
};
