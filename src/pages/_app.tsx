import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, bsc, polygon, base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { AppLayout } from "@/components/common/layouts";
import { TrackedAddressProvider } from "@/context";
import type { AppProps } from "next/app";
import { BlockiesAvatar } from "@/components/common/avatar";

const { chains, publicClient } = configureChains(
  [mainnet, bsc, polygon, base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "hashcup",
  projectId: process.env.NEXT_PUBLIC_ALCHEMY_ID as string,
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
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={lightTheme({
          accentColorForeground: "#fff6ef",
          borderRadius: "medium",
        })}
        avatar={BlockiesAvatar}
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
