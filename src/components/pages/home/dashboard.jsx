import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require("dotenv").config();

export default function Dashboard() {
  const { address } = useAccount();
  const [tokenData, setTokenData] = useState([]);

  console.log(process.env.NEXT_PUBLIC_MORALIS_API_KEY);

  useEffect(() => {
    const getTokenBalances = async () => {
      try {
        if (!Moralis.Core.isStarted) {
          await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          });
        }
        const chain = EvmChain.BSC;
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          address,
          chain,
        });

        const tokenDataResponse = response.toJSON().map((token) => ({
          ...token,
          network: "bsc",
        }));

        setTokenData((prevTokenData) =>
          prevTokenData.concat(tokenDataResponse)
        );
      } catch (error) {
        console.log(error);
      }
    };
    const getNativeBalance = async () => {
      try {
        if (!Moralis.Core.isStarted) {
          await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          });
        }

        const response = await Moralis.EvmApi.balance.getNativeBalance({
          chain: "0x38",
          address,
        });

        const nativeTokenDataResponse = {
          balance: response.toJSON().balance,
          decimals: 18,
          network: "eth",
          symbol: "ETH",
          token_address: "0x71753d0586ea6b979dfccbb492a45e611e0e0ad6",
        };

        setTokenData((prevTokenData) =>
          prevTokenData.concat(nativeTokenDataResponse)
        );
      } catch (error) {
        console.error(error);
      }
    };

    getTokenBalances();
    getNativeBalance();
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
          {tokenData.map((token, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-4">
                <p>{token.symbol}</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">
                    ${token.balance / 10 ** token.decimals}
                  </p>
                  <Image
                    src={"/svg/network/bsc.svg"}
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
          ))}
        </div>
      </div>
    </div>
  );
}
