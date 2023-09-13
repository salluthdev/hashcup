import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { AppLayout } from "@/components/common/layouts";

const { chains, publicClient } = configureChains(
  [bsc, polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "hashcup",
  projectId: `${process.env.ALCHEMY_ID}`,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
