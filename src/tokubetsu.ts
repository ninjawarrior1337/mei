import bocchi from "../assets/tokubetsu/bocchi/kessoku.json";
import llSIP from "../assets/tokubetsu/ll/sip.json";
import llS from "../assets/tokubetsu/ll/sunshine.json";
import llN from "../assets/tokubetsu/ll/niji.json";
import llSS from "../assets/tokubetsu/ll/superstar.json";
import llIKIZULIVE from "../assets/tokubetsu/ll/ikizulive.json";
import miku from "../assets/tokubetsu/miku.json";
import { z } from "zod";

export const Character = z.object({
  name: z.string(),
  color: z.string(),
  birthday: z.string(),
});

export type Character = z.infer<typeof Character>;

const TOKUBETSU_DATA = {
  kessoku: bocchi.kessoku,
  sip: llSIP.sip,
  sunshine: llS.sunshine,
  niji: llN.niji,
  superstar: llSS.superstar,
  ikizulive: llIKIZULIVE.ikizulive,
  vocaloid: miku.vocaloid,
} as Record<string, Character[]>;

export const PROX = ["next", "previous"] as const;
export type PROXY_TYPES = (typeof PROX)[number];

export class Tokubetsu {
  private TODAY: Date;
  public characters: Character[] = [];

  constructor() {
    this.TODAY = new Date(Date.now());
    if (this.characters.length > 0) {
      return;
    }
    this.characters = Object.values(TOKUBETSU_DATA).flat();
  }

  private getTZDayMonthAsString(tz: string): [string, string] {
    var month =
      this.TODAY.toLocaleDateString("en-US", {
        timeZone: tz,
        month: "numeric",
      }) || "1";
    var day =
      this.TODAY.toLocaleDateString("en-US", {
        timeZone: tz,
        day: "numeric",
      }) || "1";

    return [month, day];
  }

  private getTZDayMonthAsNumber(tz: string): [number, number] {
    const [month, day] = this.getTZDayMonthAsString(tz);

    return [parseInt(month), parseInt(day)];
  }

  private checkBirthday(i: Character, tz: string): boolean {
    const [iMonth, iDay] = i.birthday.split("/");
    const [tMonth, tDay] = this.getTZDayMonthAsString(tz);
    if (tMonth == iMonth && tDay == iDay) {
      return true;
    }
    return false;
  }

  public getBirthdayIdols(): Character[] {
    //Resolve today's date once per timezone rather than once per character.
    const tokyoToday = this.getTZDayMonthAsString("Asia/Tokyo");
    const laToday = this.getTZDayMonthAsString("America/Los_Angeles");

    //Order by timezone precedence: characters whose birthday it is in Tokyo
    //come first, then the ones it is only still their birthday for in LA.
    const inTokyo: Character[] = [];
    const inLaOnly: Character[] = [];
    for (const c of this.characters) {
      const [iMonth, iDay] = c.birthday.split("/");
      const inTokyoToday = iMonth == tokyoToday[0] && iDay == tokyoToday[1];
      const inLaToday = iMonth == laToday[0] && iDay == laToday[1];
      if (inTokyoToday) {
        inTokyo.push(c);
      } else if (inLaToday) {
        inLaOnly.push(c);
      }
    }
    return [...inTokyo, ...inLaOnly];
  }

  public proxBirthday(prox: PROXY_TYPES): Character {
    const [m, d] = this.getTZDayMonthAsNumber("Asia/Tokyo");
    const boundCharacters = this.characters
      .map((c) => {
        const [cm, cd] = c.birthday.split("/");
        return [c, parseInt(cm) * 31 + parseInt(cd)] as const;
      })
      .sort((a, b) => a[1] - b[1]);

    let found;
    switch (prox) {
      case "previous":
        found = boundCharacters.findLast((c) => c[1] < m * 31 + d);
        break;
      case "next":
        found = boundCharacters.find((c) => c[1] > m * 31 + d);
    }

    if (!found) {
      return this.characters[0];
    }

    return found[0];
  }

  public getBirthdayIdol(): Character | null {
    //Check JP birthday first
    for (var i of this.characters) {
      if (this.checkBirthday(i, "Asia/Tokyo")) {
        return i;
      }
    }
    //Check US birthdays if no JP birthdays exist
    for (var i of this.characters) {
      if (this.checkBirthday(i, "America/Los_Angeles")) {
        return i;
      }
    }
    return null;
  }
}
