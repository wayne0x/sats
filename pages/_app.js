import "../styles/globals.scss";
import "../styles/reset.scss";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { Provider } from "react-redux";
import store from "../redux/store";
import { NextUIProvider } from "@nextui-org/react";

function getLibrary(provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </Provider>
    </NextUIProvider>
  );
}

export default MyApp;
