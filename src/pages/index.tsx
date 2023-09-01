import { useIsMounted } from "@/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const mounted = useIsMounted();

  return (
    <main className="relative">
      {mounted ? (
        !isConnected ? (
          <div className="max-w-md flex flex-col items-center gap-2 p-4 mx-auto">
            <h1 className="text-2xl font-bold text-slate-800">
              Say Hello to HashCup 👋
            </h1>
            <ConnectButton />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ConnectButton />
            <p>{address}</p>
          </div>
        )
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold text-slate-800">Loading...</h1>
        </div>
      )}
    </main>
  );
}
