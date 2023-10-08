import { Footer, Header } from ".";
import { Metadata } from "../metadata";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  return (
    <div
      className={`min-h-screen flex flex-col text-root_beer bg-seashell ${rubik.className}`}
    >
      <Metadata />
      <Header />
      <main className="flex-1 py-8">{children}</main>
      <Footer />
    </div>
  );
}
