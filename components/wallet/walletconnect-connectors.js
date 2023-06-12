import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const walletConnect = new WalletConnectConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
