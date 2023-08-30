import { useIsMounted } from "@/hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const mounted = useIsMounted();

  return (
    <main className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold text-slate-800">Hello HashCup!</h1>
      <ConnectButton />

      {mounted ? address && <p>{address}</p> : null}
    </main>
  );
}
