export function getNetwork(chainId) {
  switch (chainId) {
    case "0x1":
      return "eth";
    case "0x38":
      return "bsc";
    case "0x89":
      return "polygon";
    default:
      return "";
  }
}
