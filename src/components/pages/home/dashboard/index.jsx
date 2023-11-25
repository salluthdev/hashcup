import { TrackedAddressContext } from "@/context";
import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import Overview from "./overview";
import TokenList from "./token-list";

export default function Dashboard() {
  const { address } = useAccount();
  const { trackedAddress } = useContext(TrackedAddressContext);
  const [tokenList, setTokenList] = useState([]);

  return (
    <div className="w-full max-w-xl flex flex-col gap-6 px-4 pt-6 pb-10 mx-auto">
      <Overview
        tokenList={tokenList}
        address={address}
        trackedAddress={trackedAddress}
      />
      <TokenList
        tokenList={tokenList}
        setTokenList={setTokenList}
        address={address}
        trackedAddress={trackedAddress}
      />
    </div>
  );
}
