import { describe, expect, it } from "vitest";
import { Tokubetsu } from "./tokubetsu";

/**
 * The class snapshots `Date.now()` at construction, so tests drive it by
 * overriding the private TODAY field with a fixed instant.
 */
function at(iso: string): Tokubetsu {
  const t = new Tokubetsu();
  (t as unknown as { TODAY: Date }).TODAY = new Date(iso);
  return t;
}

/** Every calendar day of `year`, sampled at noon UTC. */
function* daysOf(year: number): Generator<string> {
  for (let d = 0; ; d++) {
    const date = new Date(Date.UTC(year, 0, 1, 12) + d * 86_400_000);
    if (date.getUTCFullYear() !== year) return;
    yield date.toISOString();
  }
}

describe("every idol has a birthday", () => {
  const t = new Tokubetsu();
  const year = 2026;

  it("shows up on at least one day of the year", () => {
    const seen = new Set<string>();
    for (const iso of daysOf(year)) {
      for (const c of at(iso).getBirthdayIdols()) {
        seen.add(c.name);
      }
    }

    const missing = t.characters
      .filter((c) => !seen.has(c.name))
      .map((c) => `${c.name} (${c.birthday})`);

    expect(missing).toEqual([]);
  });

  it("has no birthdays that can never match a real date", () => {
    // Guards the test above: a malformed entry (e.g. "2/30", "13/1", "1/1/1")
    // could otherwise never surface and would show up as a silent gap.
    const invalid = t.characters
      .filter((c) => {
        const parts = c.birthday.split("/");
        if (parts.length !== 2) return true;
        const [m, d] = parts.map(Number);
        if (!Number.isInteger(m) || !Number.isInteger(d)) return true;
        if (m < 1 || m > 12 || d < 1) return true;
        // Feb 29 is valid (non-leap years roll over, leap years match).
        const maxDay = new Date(Date.UTC(2024, m, 0)).getUTCDate();
        return d > maxDay;
      })
      .map((c) => `${c.name} (${c.birthday})`);

    expect(invalid).toEqual([]);
  });
});
