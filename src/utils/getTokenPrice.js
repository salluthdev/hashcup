const Moralis = require("moralis").default;

export const getTokenPrice = async (tokenAddress, chainId) => {
  try {
    const tokenPriceResponse = await Moralis.EvmApi.token.getTokenPrice({
      address: tokenAddress,
      chain: chainId,
    });

    return tokenPriceResponse?.toJSON()?.usdPrice || 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
