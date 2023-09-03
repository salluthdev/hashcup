import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";

export default function Dashboard() {
  const { address } = useAccount();

  const tokenAddresses = [
    "152b3942A33c78C72B576d28F75910A124Ca8181",
    "c2132D05D31c914a87C6611C10748AEb04B58e8F",
  ];

  const tokenBalances = tokenAddresses.map((tokenAddress) => {
    const balance = useBalance({ address, token: `0x${tokenAddress}` });
    return balance;
  });

  return (
    <div className="flex flex-col gap-4">
      <ConnectButton />
      <p>Address: {address}</p>
      {tokenBalances.map((token, index) => (
        <div key={index} className="flex items-center gap-1">
          <p>{token.data?.formatted}</p>
          <p>{token.data?.symbol}</p>
        </div>
      ))}
    </div>
  );
}
