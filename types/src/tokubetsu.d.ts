export type Character = {
    name: string;
    color: string;
    birthday: string;
};
export declare const PROX: readonly ["next", "previous"];
export type PROXY_TYPES = typeof PROX[number];
export declare class Tokubetsu {
    private TODAY;
    characters: Character[];
    constructor();
    private getTZDayMonthAsString;
    private getTZDayMonthAsNumber;
    private checkBirthday;
    getBirthdayIdols(): Character[];
    proxBirthday(prox: PROXY_TYPES): Character;
    getBirthdayIdol(): Character | null;
}
