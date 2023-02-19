import {kessoku} from "../assets/tokubetsu/bocchi/kessoku.json"
import {sip} from "../assets/tokubetsu/ll/sip.json"
import {sunshine} from "../assets/tokubetsu/ll/sunshine.json"
import {niji} from "../assets/tokubetsu/ll/niji.json"
import {superstar} from "../assets/tokubetsu/ll/superstar.json"

interface Charater {
    name: string,
    color: string,
    birthday: string
}

const TOKUBETSU_DATA = {
    kessoku,
    sip,
    sunshine,
    niji,
    superstar
} as Record<string, Charater[]>

class Tokubetsu {
    private TODAY: Date | undefined
    public characters: Charater[] = []
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

    private checkBirthday(i: Charater, tz: string): boolean {
        const [iMonth, iDay] = i.birthday.split("/")
        const [tMonth, tDay] = this.getTZDayMonth(tz)
        if(tMonth == iMonth && tDay == iDay) {
            return true
        }
        return false;
    }

    public getBirthdayIdol(): Charater | null {
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

export const TokubetsuUtils = new Tokubetsu()