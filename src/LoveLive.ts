interface Idol {
    name: string,
    color: string,
    birthday: string
}

class LoveLiveUtils {
    private TODAY: Date | undefined
    private idols = [] as Idol[]
    private IdolDataUrl = "https://gist.githubusercontent.com/ninjawarrior1337/2a51ec53e679550a1d254a465ee79c11/raw"
    public async setup() {
        this.TODAY = new Date(Date.now())
        if (this.idols.length > 0) {
            return 
        }
        let r = await fetch(this.IdolDataUrl, {cf: {cacheEverything: true, cacheTtl: 5*60}})
        let j: any = await r.json()
        this.idols = j.idols
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

    private checkBirthday(i: Idol, tz: string): boolean {
        const [iMonth, iDay] = i.birthday.split("/")
        const [tMonth, tDay] = this.getTZDayMonth(tz)
        if(tMonth == iMonth && tDay == iDay) {
            return true
        }
        return false;
    }

    public getBirthdayIdol(): Idol | null {
        //Check JP birthday first
        for(var i of this.idols) {
            if(this.checkBirthday(i, "Asia/Tokyo")) {
                return i
            }
        }
        //Check US birthdays if no JP birthdays exist
        for(var i of this.idols) {
            if(this.checkBirthday(i, "America/Los_Angeles")) {
                return i
            }
        }
        return null
    }
}

export const LLUtils = new LoveLiveUtils()