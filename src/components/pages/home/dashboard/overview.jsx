import { USDFormat, calculateTotalNetWorth } from "@/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Overview({
  tokenList,
  address,
  trackedAddress,
  hideBalances,
  setHideBalances,
}) {
  const [totalNetWorth, setTotalNetWorth] = useState(0);

  useEffect(() => {
    // Calculate total net worth
    const netWorth = calculateTotalNetWorth(tokenList);
    setTotalNetWorth(netWorth);
  }, [tokenList, address, trackedAddress]);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-pastel_brown">Net Worth</p>
      <div className="flex items-center gap-2">
        <h1 className="text-[28px] font-bold">
          {hideBalances ? "****" : USDFormat(totalNetWorth)}
        </h1>
        <Image
          src={`/svg/icon-eye${hideBalances ? "-slash" : ""}.svg`}
          width={16}
          height={16}
          alt=""
          className="cursor-pointer hover:scale-110 active:scale-95 transition"
          onClick={() => setHideBalances(!hideBalances)}
        />
      </div>
    </div>
  );
}
