import { useIsMounted } from "@/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const mounted = useIsMounted();

  return (
    <div className="relative py-6">
      {mounted ? (
        !isConnected ? (
          <div className="max-w-md flex flex-col items-center gap-4 text-center mx-auto">
            <h1 className="text-2xl font-bold text-slate-800">
              Say Hello to HashCup 👋
            </h1>
            <p>
              Simple link to your crypto wallet. Share multiple assets overview
              at once in a good way.
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ConnectButton />
            <p>{address}</p>
          </div>
        )
      ) : null}
    </div>
  );
}
