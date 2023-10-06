import {
  NumberFormat,
  USDFormat,
  getNetworkNameByChainId,
  getTokenPrice,
} from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const Moralis = require("moralis").default;

const chainIds = ["0x1", "0x38", "0x89"];
const nativeWrappedTokenAddresses = {
  "0x1": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x38": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "0x89": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
};

export default function Dashboard() {
  const { address } = useAccount();
  const [tokenData, setTokenData] = useState([]);

  console.log(tokenData);

  const getTokenDatas = async () => {
    try {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      }

      const getTokenBalances = chainIds.map(async (chainId) => {
        const nativeBalanceResponse =
          await Moralis.EvmApi.balance.getNativeBalance({
            address,
            chain: chainId,
          });

        const nativeTokenData = {
          balance: nativeBalanceResponse.toJSON().balance,
          decimals: 18,
          network: getNetworkNameByChainId(chainId),
          symbol:
            chainId === "0x1"
              ? "ETH"
              : chainId === "0x38"
              ? "BNB"
              : chainId === "0x89"
              ? "MATIC"
              : "",
          price: await getTokenPrice(
            nativeWrappedTokenAddresses[chainId],
            chainId
          ),
        };

        const tokenResponse = await Moralis.EvmApi.token.getWalletTokenBalances(
          {
            address,
            chain: chainId,
          }
        );

        const tokenData = tokenResponse.toJSON().map(async (token) => {
          if (token.possible_spam) {
            return {
              ...token,
              network: getNetworkNameByChainId(chainId),
              price: 0,
            };
          }

          const tokenPrice = await getTokenPrice(token.token_address, chainId);

          return {
            ...token,
            network: getNetworkNameByChainId(chainId),
            price: tokenPrice,
          };
        });

        return Promise.all([nativeTokenData, ...tokenData]);
      });

      const allBalances = await Promise.all(getTokenBalances);
      const flattenedBalances = allBalances.flat();

      setTokenData(flattenedBalances);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenDatas();
  }, [address]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <Image
          src={"/img/hashcup-logo-dummy.png"}
          width={40}
          height={40}
          alt="hashcup logo"
        />
        <ConnectButton showBalance={false} chainStatus={"icon"} />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <div className="flex flex-col gap-5">
          {tokenData.map(
            (token, index) =>
              !token?.possible_spam && (
                <div key={index} className="flex items-center gap-4">
                  <Image
                    src={`/img/token/${token?.network}/${
                      token?.token_address ? token?.token_address : "native"
                    }.png`}
                    width={24}
                    height={24}
                    alt=""
                    className="rounded-full"
                  />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-4">
                      <p className="font-medium">{token?.symbol}</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {USDFormat(
                            (token?.balance / 10 ** token?.decimals) *
                              token?.price
                          )}
                        </p>
                        <Image
                          src={`/svg/network/${token?.network}.svg`}
                          width={16}
                          height={16}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-4 text-pastel_brown">
                      <p>{USDFormat(token?.price ? token?.price : "-")}</p>
                      <p>
                        {NumberFormat(token?.balance / 10 ** token?.decimals)}{" "}
                        {token?.symbol}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
