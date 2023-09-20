import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

export default function Dashboard() {
  const { address } = useAccount();
  const [tokenData, setTokenData] = useState([]);

  console.log(tokenData);

  const getTokenBalances = async () => {
    try {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      }
      const chain = EvmChain.BSC;
      const chainIds = ["0x1", "0x38", "0x89"];

      const nativeBalancePromises = chainIds.map(async (chainId) => {
        const nativeBalanceResponse =
          await Moralis.EvmApi.balance.getNativeBalance({
            chain: chainId,
            address,
          });
        return {
          chainId,
          balance: nativeBalanceResponse.toJSON().balance,
        };
      });

      const nativeBalances = await Promise.all(nativeBalancePromises);

      const tokenResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      });

      const tokenDataResponse = tokenResponse.toJSON().map((token) => ({
        ...token,
        network: "bsc",
      }));

      const nativeTokenDataResponse = nativeBalances.map((nativeBalance) => ({
        balance: nativeBalance.balance,
        decimals: 18,
        network:
          nativeBalance.chainId === "0x1"
            ? "eth"
            : nativeBalance.chainId === "0x38"
            ? "bsc"
            : nativeBalance.chainId === "0x89"
            ? "polygon"
            : "",
        symbol:
          nativeBalance.chainId === "0x1"
            ? "ETH"
            : nativeBalance.chainId === "0x38"
            ? "BNB"
            : nativeBalance.chainId === "0x89"
            ? "MATIC"
            : "",
      }));

      setTokenData([...tokenDataResponse, ...nativeTokenDataResponse]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenBalances();
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
        <ConnectButton showBalance={false} />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <div className="flex flex-col gap-5">
          {tokenData.map(
            (token, index) =>
              !token.possible_spam && (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-4">
                    <p>{token.symbol}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">
                        ${token.balance / 10 ** token.decimals}
                      </p>
                      <Image
                        src={`/svg/network/${token.network}.svg`}
                        width={16}
                        height={16}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-4 text-sandstone">
                    <p>$1.00</p>
                    <p>
                      {token.balance / 10 ** token.decimals} {token.symbol}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
