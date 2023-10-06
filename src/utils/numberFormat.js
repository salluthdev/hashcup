export function USDFormat(number) {
  return number?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export function NumberFormat(number) {
  return number.toLocaleString();
}
