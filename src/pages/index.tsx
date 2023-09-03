import { Hello } from "@/components/pages/home";
import { useIsMounted } from "@/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const mounted = useIsMounted();

  const balance = useBalance({
    address: address,
    token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  });

  console.log(balance.data);

  return (
    <div className="relative py-6">
      {mounted ? (
        !isConnected ? (
          <Hello />
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
