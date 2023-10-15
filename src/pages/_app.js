import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, bsc, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { AppLayout } from "@/components/common/layouts";
import { TrackedAddressProvider } from "@/context";

const { chains, publicClient } = configureChains(
  [mainnet, bsc, polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "hashcup",
  projectId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
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
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={lightTheme({
          accentColorForeground: "#fff6ef",
          borderRadius: "medium",
        })}
      >
        <TrackedAddressProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </TrackedAddressProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
