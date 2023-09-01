import { ReactNode } from "react";
import { Metadata } from "../metadata";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Metadata />
      <div className="max-w-3xl mx-auto">{children}</div>
    </>
  );
}
