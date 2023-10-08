export function USDFormat(number) {
  if (number < 1) {
    return number.toFixed(4);
  }

  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function NumberFormat(number) {
  if (number < 1) {
    return number.toFixed(4);
  }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
