/**
 * Single source of truth for the "en-IN, 2-digit day / short month / numeric year"
 * date format used across every notifications screen.
 *
 * Was copy-pasted inline (same options object) in:
 *   admin.tsx, employee.tsx, admin-requests-list.tsx,
 *   admin-request-review.tsx, employee-request-detail.tsx
 */
const IST = "Asia/Kolkata";

// Treat timestamps without a timezone (no Z / +05:30) as UTC
function parseDate(input: string | Date): Date {
  if (input instanceof Date) return input;
  const s = String(input).trim().replace(" ", "T");
  const hasTZ = /(Z|[+-]\d{2}:?\d{2})$/i.test(s);
  return new Date(hasTZ ? s : s + "Z");
}

export function formatDateIN(date: string | Date): string {
  return parseDate(date).toLocaleDateString("en-IN", {
    timeZone: IST,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTimeIN(date: string | Date): string {
  const d = parseDate(date);

  const datePart = d.toLocaleDateString("en-IN", {
    timeZone: IST,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timePart = d.toLocaleTimeString("en-IN", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} • ${timePart}`;
}