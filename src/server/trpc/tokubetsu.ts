import { z } from "zod";
import { procedure, router } from "./trpc";
import { PROX } from "~/tokubetsu";

export const tokubetsuRouter = router({
    birthdayToday: procedure.query(({ ctx }) => {
        return ctx.tokubetsu.getBirthdayIdol()
    }),
    birthdaysToday: procedure.query(({ ctx }) => {
        return ctx.tokubetsu.getBirthdayIdols()
    }),
    proxBirthday: procedure
        .input(z.enum(PROX))
        .query(({ input, ctx }) => {
            return ctx.tokubetsu.proxBirthday(input)
        }),
    allCharacters: procedure.query(({ ctx }) => {
        return ctx.tokubetsu.characters
    })
})