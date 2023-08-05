export type Character = {
    name: string;
    color: string;
    birthday: string;
};
export declare class Tokubetsu {
    private TODAY;
    characters: Character[];
    setup(): void;
    private getTZDayMonth;
    private checkBirthday;
    getBirthdayIdols(): Character[];
    getBirthdayIdol(): Character | null;
}
