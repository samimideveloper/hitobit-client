/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: (config, env) => {
    // const __DEV__ = env !== "production";

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    const __STAGE__ = process.env.__STAGE__;
    const __STAGE_TEST__ = process.env.__STAGE_TEST__;
    const __TESTNET__ = process.env.__TESTNET__;

    const __THEME__ = process.env.__THEME__;
    const __PLATFORM__ = process.env.__PLATFORM__;

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: !__STAGE__ && !__TESTNET__ && !__STAGE_TEST__,
        __CLIENT_SECRET__: `"${clientSecret}"`,
        __CLIENT_ID__: `"${clientId}"`,
        __STAGE__,
        __STAGE_TEST__,
        __MOCK__: false,
        __TESTNET__,
        __THEME__: `"${__THEME__}"`,
        __PLATFORM__: `"${__PLATFORM__}"`,
      }),
    );

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      // eslint-disable-next-line prettier/prettier
      antd$: "antd/lib",
    };

    return config;
  },
};
