export function USDFormat(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: number < 1 ? 4 : 2,
  });
}

export function NumberFormat(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: number < 1 ? 4 : 2,
  });
}
