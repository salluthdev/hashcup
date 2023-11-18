import Moralis from "moralis";

const nativeWrappedTokenAddresses = {
  "0x1": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x38": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "0x89": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
};

const nativeTokenData = {
  "0x1": {
    name: "Ethereum",
    symbol: "ETH",
  },
  "0x38": {
    name: "Binance Coin",
    symbol: "BNB",
  },
  "0x89": {
    name: "Polygon",
    symbol: "MATIC",
  },
};

export async function startMoralis() {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }
}

export function getNetworkNameByChainId(chainId) {
  switch (chainId) {
    case "0x1":
      return "eth";
    case "0x38":
      return "bsc";
    case "0x89":
      return "polygon";
    default:
      return "";
  }
}

export async function getTokenPrices(tokenAddress, chainId) {
  const tokenPriceResponse = await Moralis.EvmApi.token.getTokenPrice({
    address: tokenAddress,
    chain: chainId,
  });

  return tokenPriceResponse?.toJSON()?.usdPrice || 0;
}

export async function getNativeTokenData(chainId, address) {
  const nativeBalanceResponse = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain: chainId,
  });

  const nativeToken = nativeTokenData[chainId];

  return {
    name: nativeToken.name,
    balance: nativeBalanceResponse.toJSON().balance,
    decimals: 18,
    network: getNetworkNameByChainId(chainId),
    symbol: nativeToken.symbol,
    price: await getTokenPrices(nativeWrappedTokenAddresses[chainId], chainId),
  };
}

export async function getNonNativeTokenData(chainId, address) {
  const tokenResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain: chainId,
  });

  return Promise.all(
    tokenResponse.toJSON().map(async (token) => {
      try {
        if (token.possible_spam) {
          return {
            ...token,
            network: getNetworkNameByChainId(chainId),
            price: 0,
          };
        }

        const price = await getTokenPrices(token.token_address, chainId);

        return {
          ...token,
          network: getNetworkNameByChainId(chainId),
          price,
        };
      } catch (error) {
        console.log(error);
        return {
          ...token,
          network: getNetworkNameByChainId(chainId),
          price: 0,
        };
      }
    })
  );
}

export function sortTokenList(tokenList) {
  const calculateTotalBalance = (token) => {
    if (!token?.possible_spam) {
      return (token?.balance / 10 ** token?.decimals) * token?.price;
    }
    return 0;
  };

  const compareTokens = (tokenA, tokenB) => {
    const totalBalanceA = calculateTotalBalance(tokenA);
    const totalBalanceB = calculateTotalBalance(tokenB);

    return totalBalanceB - totalBalanceA;
  };

  return tokenList.filter((token) => !token?.possible_spam).sort(compareTokens);
}

export function calculateTotalNetWorth(tokenList) {
  return tokenList.reduce((total, token) => {
    if (!token?.possible_spam) {
      return total + (token?.balance / 10 ** token?.decimals) * token?.price;
    }
    return total;
  }, 0);
}

export function shortenAddress(address, length = 4) {
  if (!address || address.length <= length) {
    return address;
  }

  const prefix = address.substring(0, 2 + length);
  const suffix = address.slice(-length);

  return `${prefix}...${suffix}`;
}
