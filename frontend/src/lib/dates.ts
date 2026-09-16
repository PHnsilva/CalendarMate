function pad(value: number): string {
  return `${value}`.padStart(2, "0");
}

export const APP_TIME_ZONE = "America/Sao_Paulo";

export type AppDateTimeParts = {
  date: string;
  time: string;
};

/**
 * API booking timestamps are Instants (normally serialized with a trailing Z).
 * Date/time form fields, however, must use the business timezone rather than
 * slicing the UTC representation.
 */
export function toAppDateTimeParts(
  value?: Date | string | null,
  timeZone = APP_TIME_ZONE,
): AppDateTimeParts {
  if (!value) return { date: "", time: "" };

  const parsed = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(parsed.getTime())) return { date: "", time: "" };

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(parsed);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
  };
}

export function toAppDatePart(value?: Date | string | null): string {
  return toAppDateTimeParts(value).date;
}

export function toAppTimePart(value?: Date | string | null): string {
  return toAppDateTimeParts(value).time;
}

function parseDateInput(value: Date | string): Date {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  const normalized = value.length <= 10 ? `${value}T12:00:00` : value;
  return new Date(normalized);
}

function parseMonthInput(value: Date | string): { year: number; month: number } {
  if (value instanceof Date) {
    return { year: value.getFullYear(), month: value.getMonth() };
  }

  const date = parseDateInput(value.length === 7 ? `${value}-01` : value);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function getTodayIso(): string {
  return toIsoDatePart(new Date());
}

export function toIsoDatePart(value: Date | string): string {
  const date = parseDateInput(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function toIsoDate(value: Date | string): string {
  return toIsoDatePart(value);
}

export function toLocalDate(value: Date | string): Date {
  return parseDateInput(value);
}

export function isDateBeforeToday(value: Date | string): boolean {
  return toIsoDatePart(value) < getTodayIso();
}

export function isPastIsoDate(value: string): boolean {
  return isDateBeforeToday(value);
}

export function isBookableDate(value: Date | string): boolean {
  return !isDateBeforeToday(value);
}

export function isBookableIsoDate(value: string): boolean {
  return isBookableDate(value);
}

export function isBookableDateInMonth(
  dateValue: Date | string,
  monthValue: Date | string,
  allowedMonthSpan = 1,
): boolean {
  if (!isBookableDate(dateValue)) {
    return false;
  }

  const targetDate = parseDateInput(dateValue);
  const targetMonthIndex = targetDate.getFullYear() * 12 + targetDate.getMonth();
  const { year, month } = parseMonthInput(monthValue);
  const baseMonthIndex = year * 12 + month;

  return targetMonthIndex >= baseMonthIndex && targetMonthIndex <= baseMonthIndex + allowedMonthSpan;
}

export function isDateBlocked(
  value: Date | string,
  unavailableDates: string[] = [],
): boolean {
  return unavailableDates.includes(toIsoDatePart(value));
}

export function formatDate(value: Date | string): string {
  const date = parseDateInput(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value: Date | string): string {
  const date = parseDateInput(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function isWithinTwoHours(value: Date | string): boolean {
  const date = parseDateInput(value);
  return date.getTime() - Date.now() < 2 * 60 * 60 * 1000;
}
