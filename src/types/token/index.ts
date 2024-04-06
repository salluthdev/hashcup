export interface TokenDetailTypes {
  network: string;
  token_address: string;
  symbol: string;
  name: string;
  decimals: number;
  price: number;
  balance: number;
  possible_spam?: boolean;
  chain_id?: string;
}
