import bocchi from "../assets/tokubetsu/bocchi/kessoku.json"
import llSIP from "../assets/tokubetsu/ll/sip.json"
import llS from "../assets/tokubetsu/ll/sunshine.json"
import llN from "../assets/tokubetsu/ll/niji.json"
import llSS from "../assets/tokubetsu/ll/superstar.json"

type Character = {
    name: string,
    color: string,
    birthday: string
};

const TOKUBETSU_DATA = {
    kessoku: bocchi.kessoku,
    sip: llSIP.sip,
    sunshine: llS.sunshine,
    niji: llN.niji,
    superstar: llSS.superstar
} as Record<string, Character[]>

export class Tokubetsu {
    private TODAY: Date | undefined
    public characters: Character[] = []
    public setup() {
        this.TODAY = new Date(Date.now())
        if (this.characters.length > 0) {
            return 
        }
        this.characters = Object.values(TOKUBETSU_DATA).flat()
    }

    private getTZDayMonth(tz: string): [string, string] {
        var month = this.TODAY?.toLocaleDateString("en-US", {
            timeZone: tz,
            month: "numeric"
        }) || "1"
        var day = this.TODAY?.toLocaleDateString("en-US", {
            timeZone: tz,
            day: "numeric"
        }) || "1"

        return [month, day]
    }

    private checkBirthday(i: Character, tz: string): boolean {
        const [iMonth, iDay] = i.birthday.split("/")
        const [tMonth, tDay] = this.getTZDayMonth(tz)
        if(tMonth == iMonth && tDay == iDay) {
            return true
        }
        return false;
    }

    public getBirthdayIdols(): Character[] {
        return this.characters.filter((c) => this.checkBirthday(c, "Asia/Tokyo") || this.checkBirthday(c, "America/Los_Angeles"))
    }

    public getBirthdayIdol(): Character | null {
        //Check JP birthday first
        for(var i of this.characters) {
            if(this.checkBirthday(i, "Asia/Tokyo")) {
                return i
            }
        }
        //Check US birthdays if no JP birthdays exist
        for(var i of this.characters) {
            if(this.checkBirthday(i, "America/Los_Angeles")) {
                return i
            }
        }
        return null
    }
}