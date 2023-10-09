import Moralis from "moralis";
import { getNetworkNameByChainId, getTokenPrice } from "@/utils";

const nativeWrappedTokenAddresses = {
  "0x1": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x38": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "0x89": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
};

export async function startMoralis() {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }
}

export async function getNativeTokenData(chainId, address) {
  const nativeBalanceResponse = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain: chainId,
  });

  return {
    balance: nativeBalanceResponse.toJSON().balance,
    decimals: 18,
    network: getNetworkNameByChainId(chainId),
    symbol: chainId === "0x1" ? "ETH" : chainId === "0x38" ? "BNB" : "MATIC",
    price: await getTokenPrice(nativeWrappedTokenAddresses[chainId], chainId),
  };
}

export async function getNonNativeTokenData(chainId, address) {
  const tokenResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain: chainId,
  });

  return tokenResponse.toJSON().map(async (token) => {
    if (token.possible_spam) {
      return {
        ...token,
        network: getNetworkNameByChainId(chainId),
        price: 0,
      };
    }

    return {
      ...token,
      network: getNetworkNameByChainId(chainId),
      price: await getTokenPrice(token.token_address, chainId),
    };
  });
}
