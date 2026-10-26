import type { ServiceWindow, Weekday } from "@/config/site";
import type { Dictionary, Lang } from "@/i18n";

export type Week = Readonly<Record<Weekday, readonly ServiceWindow[]>>;
export type ZonedNow = { weekday: Weekday; minutes: number };

export type ServiceStatus =
  | { kind: "today"; period: "lunch" | "evening"; window: ServiceWindow; open: boolean }
  | { kind: "closed"; dayOffset: number; weekday: Weekday; window: ServiceWindow }
  | { kind: "none" };

const WEEKDAYS: Record<string, Weekday> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const EVENING_FROM = 17 * 60;

export function toMinutes(hhmm: string): number {
  const [h = "0", m = "0"] = hhmm.split(":");
  return Number(h) * 60 + Number(m);
}

const crossesMidnight = (w: ServiceWindow) => toMinutes(w.close) <= toMinutes(w.open);

/** Wall-clock weekday + minutes in the given IANA zone (Europe/Paris), independent of the visitor's zone. */
export function zonedNow(date: Date, timeZone: string): ZonedNow {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekday: WEEKDAYS[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getServiceStatus(now: ZonedNow, week: Week): ServiceStatus {
  const yesterday = ((now.weekday + 6) % 7) as Weekday;
  for (const w of week[yesterday]) {
    if (crossesMidnight(w) && now.minutes < toMinutes(w.close)) {
      return { kind: "today", period: "evening", window: w, open: true };
    }
  }
  for (const w of week[now.weekday]) {
    const open = toMinutes(w.open);
    const close = toMinutes(w.close) + (crossesMidnight(w) ? 1440 : 0);
    if (now.minutes < close) {
      return {
        kind: "today",
        period: open >= EVENING_FROM ? "evening" : "lunch",
        window: w,
        open: now.minutes >= open,
      };
    }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const weekday = ((now.weekday + offset) % 7) as Weekday;
    const first = week[weekday][0];
    if (first) return { kind: "closed", dayOffset: offset, weekday, window: first };
  }
  return { kind: "none" };
}

/** FR: 19H, 22H30 · EN: 19:00 */
export function formatTime(hhmm: string, lang: Lang): string {
  const [h = "0", m = "00"] = hhmm.split(":");
  if (lang !== "fr") return `${h.padStart(2, "0")}:${m}`;
  return m === "00" ? `${Number(h)}H` : `${Number(h)}H${m}`;
}

/** FR: 19H à 23H · EN: 19:00 to 23:00 */
export function formatWindow(w: ServiceWindow, lang: Lang): string {
  return `${formatTime(w.open, lang)} ${lang === "fr" ? "à" : lang === "ar" ? "إلى" : "to"} ${formatTime(w.close, lang)}`;
}

/** FR: "CE SOIR, DE 19H À 23H" / "FERMÉ, RÉOUVERTURE DEMAIN À 12H" · EN: "TONIGHT, 19:00 TO 23:00". */
export function formatStatus(status: ServiceStatus, dict: Dictionary): string {
  const lang = dict.lang as Lang;
  const s = dict.status;
  switch (status.kind) {
    case "today": {
      const label = status.period === "evening" ? s.tonight : s.lunch;
      return [`${label},`, s.from, formatWindow(status.window, lang)].filter(Boolean).join(" ").toUpperCase();
    }
    case "closed": {
      const when = status.dayOffset === 1 ? s.tomorrow : (dict.days[status.weekday] ?? "");
      return `${s.closed}, ${s.reopen} ${when} ${s.at} ${formatTime(status.window.open, lang)}`.toUpperCase();
    }
    default:
      return "";
  }
}

/** Rows for the hours table, Monday first. */
export function weekRows(week: Week, dict: Dictionary): { day: string; value: string; weekday: Weekday }[] {
  const order: Weekday[] = [1, 2, 3, 4, 5, 6, 0];
  const lang = dict.lang as Lang;
  return order.map((weekday) => {
    const windows = week[weekday];
    return {
      weekday,
      day: dict.days[weekday] ?? "",
      value: windows.length ? windows.map((w) => formatWindow(w, lang)).join(", ") : dict.info.closed,
    };
  });
}
