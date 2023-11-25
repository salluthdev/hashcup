import { USDFormat, calculateTotalNetWorth } from "@/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Overview({ tokenList, address, trackedAddress }) {
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
        <h1 className="text-[28px] font-bold">{USDFormat(totalNetWorth)}</h1>
        <Image src={"/svg/icon-eye.svg"} width={24} height={14} alt="" />
      </div>
    </div>
  );
}
