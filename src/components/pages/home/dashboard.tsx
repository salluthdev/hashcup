import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Dashboard() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-4">
      <ConnectButton />
      <p>Address: {address}</p>
    </div>
  );
}
