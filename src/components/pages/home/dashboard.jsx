import { ModalTokenDetail } from "@/components/common/modal";
import {
  NumberFormat,
  USDFormat,
  calculateTotalNetWorth,
  getNativeTokenData,
  getNonNativeTokenData,
  sortTokenList,
  startMoralis,
} from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const chainIds = ["0x1", "0x38", "0x89"];

export default function Dashboard() {
  const { address } = useAccount();
  const [tokenList, setTokenList] = useState([]);
  const [totalNetWorth, setTotalNetWorth] = useState(0);
  const [selectedTokenDetail, setSelectedTokenDetail] = useState([]);
  const [modal, setModal] = useState("");

  console.log(tokenList);

  const getTokenDatas = async () => {
    try {
      await startMoralis();

      // Get native and non-native token data
      const getTokenData = chainIds.map(async (chainId) => {
        const nativeTokenData = await getNativeTokenData(chainId, address);
        const tokenData = await getNonNativeTokenData(chainId, address);

        return Promise.all([nativeTokenData, ...tokenData]);
      });

      const allBalances = await Promise.all(getTokenData);
      const flattenedBalances = allBalances.flat();

      // Short tokenlist from higher total balance to lower
      const sortedTokenList = sortTokenList(flattenedBalances);
      setTokenList(sortedTokenList);

      // Calculate total net worth
      const netWorth = calculateTotalNetWorth(sortedTokenList);
      setTotalNetWorth(netWorth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenDatas();
  }, [address]);

  return (
    <>
      <div className="w-full max-w-2xl flex flex-col gap-6 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="text-[28px] font-bold">{USDFormat(totalNetWorth)}</h1>
          <p className="text-sm text-pastel_brown">(Net Worth)</p>
        </div>
        <div className="flex flex-col">
          {tokenList.map((token, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 hover:bg-linen transition rounded-lg py-2 px-6 -mx-6 cursor-pointer"
              onClick={() => {
                setSelectedTokenDetail(token);
                setModal("modal-token-detail");
              }}
            >
              <Image
                src={`/img/token/${token?.network}/${
                  token?.token_address ? token?.token_address : "native"
                }.png`}
                width={24}
                height={24}
                alt=""
                className="group-hover:scale-105 group-active:scale-95 transition rounded-full"
              />
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                  <p className="font-medium">{token?.symbol}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">
                      {USDFormat(
                        (token?.balance / 10 ** token?.decimals) * token?.price
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
          ))}
        </div>
      </div>
      {modal === "modal-token-detail" && (
        <ModalTokenDetail
          setModal={setModal}
          selectedTokenDetail={selectedTokenDetail}
        />
      )}
    </>
  );
}
