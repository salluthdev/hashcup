import { Metadata } from "../metadata";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  return (
    <div className={`min-h-screen bg-rose_white ${rubik.className}`}>
      <Metadata />
      <div className="max-w-3xl text-zinnwaldite_brown mx-auto">
        <main className="px-4">{children}</main>
      </div>
    </div>
  );
}
