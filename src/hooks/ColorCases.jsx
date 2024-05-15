export function colorTextPercentage(element) {
  element = parseFloat(element);
  if (element <= 0) return "text-dark";
  if (element > 0 && element <= 33.33) return "text-success";
  if (element > 33.33 && element <= 66.66) return "text-warning";
  if (element > 66.66 && element <= 100) return "text-danger";
}

export function statusPercentage(element) {
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
  return (Math.round(number * 100) / 100).toFixed(2);
}

export function statusImpact(element) {
  element = parseFloat(element);
  if (element <= 0) return "Nulo";
  if (element > 0 && element <= 2.5) return "text-success";
  if (element > 2.5 && element <= 5) return "text-warning";
  if (element > 5 && element <= 7.5) return "text-danger";
  if (element > 7.5 && element <= 10) return "text-danger";
}

export function statusImpactText(element) {
  element = parseFloat(element);
  if (element <= 0) return "Nulo";
  if (element > 0 && element <= 2.5) return "Bajo";
  if (element > 2.5 && element <= 5) return "Medio";
  if (element > 5 && element <= 7.5) return "Alto";
  if (element > 7.5 && element <= 10) return "Severo";
}
