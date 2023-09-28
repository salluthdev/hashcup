import { Footer } from ".";
import { Metadata } from "../metadata";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  return (
    <div
      className={`min-h-screen flex flex-col bg-seashell ${rubik.className}`}
    >
      <Metadata />
      <main className="w-full max-w-3xl flex-1 text-root_beer px-4 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
