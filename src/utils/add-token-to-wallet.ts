import { toast } from "react-toastify";

interface SelectedTokenDetail {
  token_address: string;
  symbol: string;
  decimals: number;
}

export const addTokenToMetaMask = (
  selectedTokenDetail: SelectedTokenDetail
) => {
  // Check if MetaMask is installed
  if (typeof window !== "undefined" && "ethereum" in window) {
    const tokenData = {
      type: "ERC20",
      options: {
        address: selectedTokenDetail.token_address,
        symbol: selectedTokenDetail.symbol,
        decimals: selectedTokenDetail.decimals,
      },
    };

    // Request MetaMask to add the token
    (window.ethereum as any)
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: tokenData.options,
        },
      })
      .then((success: boolean) => {
        if (success) {
          toast.success("Token added to MetaMask! 🥳🎉");
        } else {
          toast.error("Oops! Try again later 🧐");
        }
      })
      .catch((error: boolean) => {
        console.error("MetaMask error:", error);
      });
  } else {
    // MetaMask is not installed, prompt the user to install it
    toast.error("Please install MetaMask 🙂");
  }
};
