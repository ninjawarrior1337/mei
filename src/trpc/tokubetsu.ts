import { t } from "./trpc";

export const tokubetsuRouter = t.router({
    birthdayToday: t.procedure.query(({ctx}) => {
        return ctx.tokubetsu.getBirthdayIdol()
    }),

    birthdaysToday: t.procedure.query(({ctx}) => {
        return ctx.tokubetsu.getBirthdayIdols()
    }),
    allCharacters: t.procedure.query(({ctx}) => {
        return ctx.tokubetsu.characters
    })
})