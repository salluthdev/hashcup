export function USDFormat(number: number | string) {
  if (typeof number === "string") {
    return;
  }

  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: number < 1 ? 4 : 2,
  });
}

export function NumberFormat(number: number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: number < 1 ? 4 : 2,
  });
}
