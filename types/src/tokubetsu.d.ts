import { z } from "zod";
export declare const Character: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodString;
    birthday: z.ZodString;
}, z.core.$strip>;
export type Character = z.infer<typeof Character>;
export declare const PROX: readonly ["next", "previous"];
export type PROXY_TYPES = (typeof PROX)[number];
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
