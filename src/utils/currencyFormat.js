export function USDFormat(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}