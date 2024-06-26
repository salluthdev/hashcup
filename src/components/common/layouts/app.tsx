import { useAccount } from "wagmi";
import { Footer, Header } from ".";
import { Metadata } from "../metadata";
import { Rubik } from "next/font/google";
import { useIsMounted } from "@/hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ReactNode, useContext } from "react";
import { TrackedAddressContext } from "@/context";

interface AppLayoutProps {
  children: ReactNode;
}

const rubik = Rubik({ subsets: ["latin"] });

export default function AppLayout({ children }: AppLayoutProps) {
  const { isConnected } = useAccount();
  const mounted = useIsMounted();
  const { trackedAddress } = useContext(TrackedAddressContext);

  return (
    <div
      className={`min-h-screen flex flex-col text-root_beer bg-seashell ${rubik.className}`}
    >
      <Metadata />
      {mounted ? isConnected || trackedAddress ? <Header /> : null : null}
      <main className="flex-1">{children}</main>
      <Footer />
      <ToastContainer position="top-center" autoClose={1600} />
    </div>
  );
}
