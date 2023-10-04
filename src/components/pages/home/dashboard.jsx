import { getNetworkNameByChainId } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const Moralis = require("moralis").default;

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
      const chainIds = ["0x1", "0x38", "0x89"];

      const balancePromises = chainIds.map(async (chainId) => {
        const nativeBalanceResponse =
          await Moralis.EvmApi.balance.getNativeBalance({
            address,
            chain: chainId,
          });

        const tokenResponse = await Moralis.EvmApi.token.getWalletTokenBalances(
          {
            address,
            chain: chainId,
          }
        );

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
        };

        const tokenData = tokenResponse.toJSON().map(async (token) => {
          if (token.possible_spam) {
            return {
              ...token,
              network: getNetworkNameByChainId(chainId),
              price: 0,
            };
          }

          const tokenPriceResponse = await Moralis.EvmApi.token.getTokenPrice({
            address: token.token_address,
            chain: chainId,
          });

          return {
            ...token,
            network: getNetworkNameByChainId(chainId),
            price: tokenPriceResponse?.toJSON()?.usdPrice || 0,
          };
        });

        return Promise.all([nativeTokenData, ...tokenData]);
      });

      const allBalances = await Promise.all(balancePromises);
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
                      <p>{token?.symbol}</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          ${token?.balance / 10 ** token?.decimals}
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
                      <p>$1.00</p>
                      <p>
                        {token?.balance / 10 ** token?.decimals} {token?.symbol}
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
