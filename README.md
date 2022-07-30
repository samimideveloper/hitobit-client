# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## get start

`yarn add hitobit-client`

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
