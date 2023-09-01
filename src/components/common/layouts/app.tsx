import { ReactNode } from "react";
import { Metadata } from "../metadata";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Metadata />
      <div className="max-w-md mx-auto">{children}</div>
    </>
  );
}
