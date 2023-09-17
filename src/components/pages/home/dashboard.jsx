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

  useEffect(() => {
    const getTokenBalances = async () => {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjljZWEyNzg2LWFjN2MtNDgwNy1hYTMzLWIwZmIwZTE3YTRiYSIsIm9yZ0lkIjoiMjc2NzI2IiwidXNlcklkIjoiMjgyMjczIiwidHlwZUlkIjoiZTg3NjUwZmQtNDg2MC00YjZmLTk5MGItMzMyYTM1MWNjOTIyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTM5OTA3NTEsImV4cCI6NDg0OTc1MDc1MX0.tgoUHCs-CnbgCq3AL_s3Tm6a2N1e1qcc1VN50QoCx7w",
        });
      }
      const chain = EvmChain.BSC;
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      });

      setTokenData(response.toJSON());
    };

    getTokenBalances();
  }, [address]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Image
          src={"/img/hashcup-logo-dummy.png"}
          width={40}
          height={40}
          alt="hashcup logo"
        />
        <ConnectButton showBalance={false} />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Wallet</h1>
        {tokenData.map((token, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between items-center gap-4">
              <p>{token.symbol}</p>
              <p className="font-semibold">
                {token.balance / 10 ** token.decimals}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
