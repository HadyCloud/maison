import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { formatStatus, formatTime, getServiceStatus, type Week, weekRows, zonedNow } from "@/lib/hours";

const week = site.hours.week;
const at = (weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6, hhmm: string) => {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  return { weekday, minutes: h * 60 + m };
};

describe("ce soir / hours logic", () => {
  it("shows lunch before and during the lunch service", () => {
    expect(formatStatus(getServiceStatus(at(2, "10:00"), week), fr)).toBe("CE MIDI, DE 12H À 15H");
    expect(formatStatus(getServiceStatus(at(2, "13:30"), week), fr)).toBe("CE MIDI, DE 12H À 15H");
  });

  it("switches to tonight between services", () => {
    expect(formatStatus(getServiceStatus(at(4, "16:00"), week), fr)).toBe("CE SOIR, DE 19H À 23H");
  });

  it("handles Monday (dinner only, until 22:30)", () => {
    expect(formatStatus(getServiceStatus(at(1, "09:00"), week), fr)).toBe("CE SOIR, DE 19H À 22H30");
  });

  it("announces tomorrow's reopening after closing", () => {
    expect(formatStatus(getServiceStatus(at(2, "23:30"), week), fr)).toBe("FERMÉ, RÉOUVERTURE DEMAIN À 12H");
    // Sunday night → Monday reopens for dinner only
    expect(formatStatus(getServiceStatus(at(0, "22:15"), week), fr)).toBe("FERMÉ, RÉOUVERTURE DEMAIN À 19H");
  });

  it("names the day when the next opening is not tomorrow", () => {
    const sparse: Week = { 0: [], 1: [], 2: [{ open: "19:00", close: "23:00" }], 3: [], 4: [], 5: [], 6: [] };
    expect(formatStatus(getServiceStatus(at(2, "23:30"), sparse), fr)).toBe("FERMÉ, RÉOUVERTURE MARDI À 19H");
  });

  it("keeps a service that runs past midnight open", () => {
    const late: Week = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [{ open: "19:00", close: "00:30" }], 6: [] };
    const status = getServiceStatus(at(6, "00:10"), late);
    expect(status).toMatchObject({ kind: "today", open: true });
  });

  it("formats in English", () => {
    expect(formatStatus(getServiceStatus(at(3, "18:00"), week), en)).toBe("TONIGHT, 19:00 TO 23:00");
    expect(formatTime("22:30", "fr")).toBe("22H30");
  });

  it("reads the wall clock in Europe/Paris, whatever the visitor's zone", () => {
    // 2026-10-20T21:30:00Z = Tuesday 23:30 in Paris (CEST, UTC+2)
    expect(zonedNow(new Date("2026-10-20T21:30:00Z"), "Europe/Paris")).toEqual({
      weekday: 2,
      minutes: 23 * 60 + 30,
    });
    // 2026-12-01T11:00:00Z = Tuesday 12:00 in Paris (CET, UTC+1)
    expect(zonedNow(new Date("2026-12-01T11:00:00Z"), "Europe/Paris")).toEqual({
      weekday: 2,
      minutes: 12 * 60,
    });
  });

  it("builds a Monday-first hours table", () => {
    const rows = weekRows(week, fr);
    expect(rows[0]?.day).toBe("Lundi");
    expect(rows[0]?.value).toBe("19H à 22H30");
    expect(rows.at(-1)?.day).toBe("Dimanche");
  });
});
