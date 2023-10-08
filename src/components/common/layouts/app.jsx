import { useAccount } from "wagmi";
import { Footer, Header } from ".";
import { Metadata } from "../metadata";
import { Rubik } from "next/font/google";
import { useIsMounted } from "@/hooks";

const rubik = Rubik({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  const { isConnected } = useAccount();
  const mounted = useIsMounted();

  return (
    <div
      className={`min-h-screen flex flex-col text-root_beer bg-seashell ${rubik.className}`}
    >
      <Metadata />
      {mounted ? isConnected ? <Header /> : null : null}
      <main className="flex-1 py-10">{children}</main>
      <Footer />
    </div>
  );
}
