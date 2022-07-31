# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## get start

`yarn add hitobit-client hitobit-services`

Add provider to Top of your app

```js
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

### Services

```js
import { useGetCapitalV1PublicCurrencyAll } from "hitobit-services";

const Comp = () => {
  const { data, isLoading } = useGetCapitalV1PublicCurrencyAll();
};
```

### webpack

Add This modules to include

    "node_modules/hitobit-client",
    "node_modules/hitobit-constants",
    "node_modules/hitobit-hooks",
    "node_modules/hitobit-modules",
    "node_modules/hitobit-services",
    "node_modules/hitobit-store",
    "node_modules/hitobit-utils"
