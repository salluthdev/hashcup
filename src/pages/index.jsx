import { Dashboard, Hello } from "@/components/pages/home";
import { useIsMounted } from "@/hooks";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  const mounted = useIsMounted();

  return (
    <div className="relative">
      {mounted ? !isConnected ? <Hello /> : <Dashboard /> : null}
    </div>
  );
}
