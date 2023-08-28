import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold text-slate-800">Hello HashCup!</h1>
      <ConnectButton />
    </main>
  );
}
