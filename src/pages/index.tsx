import { Hello } from "@/components/pages/home";
import { useIsMounted } from "@/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const mounted = useIsMounted();

  const SDFTBalance = useBalance({
    address: address,
    token: "0x152b3942A33c78C72B576d28F75910A124Ca8181",
  });

  const USDTBalance = useBalance({
    address: address,
    token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  });

  console.log(USDTBalance);

  return (
    <div className="relative py-6">
      {mounted ? (
        !isConnected ? (
          <Hello />
        ) : (
          <div className="flex flex-col gap-4">
            <ConnectButton />
            <p>Address: {address}</p>
            <p>
              SDFT: {SDFTBalance.data?.formatted} {SDFTBalance.data?.symbol}
            </p>
            <p>
              USDT (polygon): {USDTBalance.data?.formatted}{" "}
              {USDTBalance.data?.symbol}
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}
