import {
  NumberFormat,
  USDFormat,
  getNativeTokenData,
  getNonNativeTokenData,
  sortTokenList,
  startMoralis,
} from "@/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  ModalTokenDetail,
  ModalTokenTransfer,
} from "@/components/common/modal/dashboard";
import { TokenDetailTypes } from "@/types/token";

interface TokenListProps {
  tokenList: TokenDetailTypes[];
  setTokenList: React.Dispatch<React.SetStateAction<TokenDetailTypes[]>>;
  address: string;
  trackedAddress: string;
  hideBalances: boolean;
}

const chainIds = ["0x1", "0x38", "0x89"];

export default function TokenList({
  tokenList,
  setTokenList,
  address,
  trackedAddress,
  hideBalances,
}: TokenListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTokenDetail, setSelectedTokenDetail] =
    useState<TokenDetailTypes>({} as TokenDetailTypes);
  const [modal, setModal] = useState<string>("");
  const [tokenImageError, setTokenImageError] = useState<string[]>([]);

  const getTokenDatas = async () => {
    setIsLoading(true);
    setTokenList([]);

    try {
      await startMoralis();

      // Get native and non-native token data
      const getTokenData = chainIds.map(async (chainId) => {
        const nativeTokenData = await getNativeTokenData(
          chainId,
          address || trackedAddress
        );
        const tokenData = await getNonNativeTokenData(
          chainId,
          address || trackedAddress
        );

        return Promise.all([nativeTokenData, ...tokenData]);
      });

      const allBalances = await Promise.all(getTokenData);
      const flattenedBalances = allBalances.flat();

      // Short tokenlist from higher total balance to lower
      const sortedTokenList = sortTokenList(flattenedBalances);
      setTokenList(sortedTokenList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTokenDatas();
  }, [address, trackedAddress]);

  return (
    <>
      <div className="flex flex-col">
        {tokenList.length > 0 ? (
          tokenList.map((token, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4 hover:bg-linen transition rounded-lg py-2 px-6 -mx-6 cursor-pointer"
              onClick={() => {
                setSelectedTokenDetail(token);
                setModal("modal-token-detail");
              }}
            >
              <div className="relative">
                {!tokenImageError.includes(token.token_address) ? (
                  <Image
                    src={`/img/token/${token?.network}/${
                      token?.token_address ? token?.token_address : "native"
                    }.png`}
                    width={24}
                    height={24}
                    alt=""
                    className="rounded-full"
                    onError={() => {
                      setTokenImageError((prevErrors) => [
                        ...prevErrors,
                        token?.token_address,
                      ]);
                    }}
                  />
                ) : (
                  <div className="w-6 h-6 flex justify-center items-center bg-root_beer rounded-full">
                    <span className="text-xs font-medium text-white">
                      {token?.symbol[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                  <p className="font-medium">{token?.symbol}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">
                      {hideBalances
                        ? "****"
                        : USDFormat(
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
                    {hideBalances
                      ? "****"
                      : NumberFormat(
                          token?.balance / 10 ** token?.decimals
                        )}{" "}
                    {hideBalances ? "" : token?.symbol}
                  </p>
                </div>
              </div>
              <div
                className="group bg-linen hover:bg-root_beer rounded-lg p-2 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTokenDetail(token);
                  setModal("modal-token-transfer");
                  toast.info("Coming Soon 🐱‍💻");
                }}
              >
                <Image
                  src={"/svg/icon-send.svg"}
                  width={16}
                  height={16}
                  alt=""
                  className="group-hover:hidden"
                />
                <Image
                  src={"/svg/icon-send-light.svg"}
                  width={16}
                  height={16}
                  alt=""
                  className="hidden group-hover:block"
                />
              </div>
            </div>
          ))
        ) : !isLoading ? (
          <p>Oops! Something error, please contact the developer :(</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {modal === "modal-token-detail" ? (
        <ModalTokenDetail
          setModal={setModal}
          selectedTokenDetail={selectedTokenDetail}
        />
      ) : (
        modal === "modal-token-transfer" && (
          <ModalTokenTransfer
            setModal={setModal}
            selectedTokenDetail={selectedTokenDetail}
          />
        )
      )}
    </>
  );
}
