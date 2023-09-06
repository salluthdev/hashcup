import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";

export default function Dashboard() {
  const { address } = useAccount();

  const usdt_bsc_balance = useBalance({
    address: address,
    token: "0x55d398326f99059fF775485246999027B3197955",
    chainId: 56,
  });

  const usdt_polygon_balance = useBalance({
    address: address,
    token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    chainId: 137,
  });

  return (
    <div className="flex flex-col gap-4">
      <ConnectButton />
      <p>Address: {address}</p>
      <p>
        {usdt_bsc_balance.data?.formatted} {usdt_bsc_balance.data?.symbol}
      </p>
      <p>
        {usdt_polygon_balance.data?.formatted}{" "}
        {usdt_polygon_balance.data?.symbol}
      </p>
    </div>
  );
}
