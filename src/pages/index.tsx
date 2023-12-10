import { Dashboard, Hello } from "@/components/pages/home";
import { TrackedAddressContext } from "@/context";
import { useIsMounted } from "@/hooks";
import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  const mounted = useIsMounted();
  const { trackedAddress, setTrackedAddress } = useContext(
    TrackedAddressContext
  );

  useEffect(() => {
    isConnected && setTrackedAddress("");
  }, [isConnected, setTrackedAddress]);

  return (
    <div className="relative">
      {mounted ? (
        !isConnected && !trackedAddress ? (
          <Hello />
        ) : (
          <Dashboard />
        )
      ) : null}
    </div>
  );
}
