import { ReactNode } from "react";
import { Metadata } from "../metadata";

export default function AppLayout({ children }) {
  return (
    <>
      <Metadata />
      <div className="max-w-3xl mx-auto">
        <main className="px-4">{children}</main>
      </div>
    </>
  );
}
