# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Get start

`yarn add hitobit-client hitobit-services`

Add provider to Top of your app

```js
// add your domain name to top level of app
// before calling any api this should be set
URLManager.setDomainName("hitobit")

function App(){
  return (
    <HitobitClientProvider
      language="fa"
      initializer={async () => {
        await setStoredTheme();
        await setStoredBalance();
      }}
    >
      <Routes>
    </HitobitClientProvider>
  );
}
```

### Webpack

Add This modules to include

    "node_modules/hitobit-client",
    "node_modules/hitobit-constants",
    "node_modules/hitobit-hooks",
    "node_modules/hitobit-modules",
    "node_modules/hitobit-services",
    "node_modules/hitobit-store",
    "node_modules/hitobit-utils"

### Global variables

webpack

```js
config.plugins.push(
  new webpack.DefinePlugin({
    __CLIENT_SECRET__: `"Your client secret"`,
    __CLIENT_ID__: `"Your client id"`,
    __DEV__: true,
    __STAGE__: false,
    __STAGE_TEST__: false,
    __TESTNET__: false,
    __PRODUCTION__: false,
    __MOCK__: false,
    __PLATFORM__: `"web"` | `"pwa"` | `"native"`,
  }),
);
```

jest

```js
config.globals = {
  ...config.globals,
  __CLIENT_SECRET__: `"Your client secret"`,
  __CLIENT_ID__: `"Your client id"`,
  __DEV__: true,
  __STAGE__: false,
  __STAGE_TEST__: false,
  __TESTNET__: false,
  __PRODUCTION__: false,
  __MOCK__: false,
  __PLATFORM__: `"web"` | `"pwa"` | `"native"`,
};
```

# Services

```js
import { useGetCapitalV1PublicCurrencyAll } from "hitobit-services";

const Comp = () => {
  const { data, isLoading } = useGetCapitalV1PublicCurrencyAll();
};
```
