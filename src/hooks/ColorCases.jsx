export function colorTextPercentage(element) {
  element = parseFloat(element);
  if (element <= 0) return "text-dark";
  if (element > 0 && element <= 33.33) return "text-success";
  if (element > 33.33 && element <= 66.66) return "text-warning";
  if (element > 66.66 && element <= 100) return "text-danger";
}

export function statusPercentage(element) {
  if (element == null) return "dark";
  element = parseFloat(element);
  if (element <= 0) return "dark";
  if (element > 0 && element <= 33.33) return "success";
  if (element > 33.33 && element <= 66.66) return "warning";
  if (element > 66.66 && element <= 100) return "danger";
}

export function colorBackgroundPercentage(element) {
  element = parseFloat(element);
  if (element <= 0) return "bg-dark";
  if (element > 0 && element <= 33.33) return "bg-success";
  if (element > 33.33 && element <= 66.66) return "bg-warning";
  if (element > 66.66 && element <= 100) return "bg-danger";
}

export function convertToPercentage(number) {
  number = parseFloat(number);
  return (Math.round(number * 100) / 100).toFixed(2) + "%";
}

export function statusImpact(prob, impact) {
  if (prob >= 1 && prob <= 6) {
    if (impact >= 1 && impact + prob <= 7) {
      return "text-success";
    }
  }
  if (prob >= 5 && prob <= 10) {
    if (impact + prob >= 15 && impact <= 10) {
      return "text-danger";
    }
  }
  return "text-warning";
}

export function statusImpactText(element) {
  return "text-warning";
}

export function colorRiskText(element, anotherCase = 1) {
  return anotherCase === 0
    ? "text-dark"
    : element > 0
    ? "text-danger"
    : "text-success";
}
