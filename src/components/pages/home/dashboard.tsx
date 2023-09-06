import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";

export default function Dashboard() {
  const { address } = useAccount();

  const balance = useBalance({
    address: address,
    token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  });

  console.log(balance.data);

  return (
    <div className="flex flex-col gap-4">
      <ConnectButton />
      <p>Address: {address}</p>
    </div>
  );
}
