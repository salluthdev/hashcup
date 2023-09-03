import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Hello() {
  return (
    <div className="max-w-md flex flex-col items-center gap-4 text-center mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">
        Say Hello to HashCup 👋
      </h1>
      <p>
        Simple link to your crypto wallet. Share multiple assets overview at
        once in a good way.
      </p>
      <ConnectButton />
    </div>
  );
}
