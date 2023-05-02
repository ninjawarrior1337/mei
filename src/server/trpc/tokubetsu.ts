import { procedure, router } from "./trpc";

export const tokubetsuRouter = router({
    birthdayToday: procedure.query(({ctx}) => {
        return ctx.tokubetsu.getBirthdayIdol()
    }),

    birthdaysToday: procedure.query(({ctx}) => {
        return ctx.tokubetsu.getBirthdayIdols()
    }),
    allCharacters: procedure.query(({ctx}) => {
        return ctx.tokubetsu.characters
    })
})