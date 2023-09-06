import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, bsc, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { AppLayout } from "@/components/common/layouts";

const { chains, publicClient } = configureChains([polygon], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "hashcup",
  projectId: "e1ec6b3b2c70b3446a9c7bb1758e94ea",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
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
