import { z } from "zod";
import { procedure, router } from "./trpc";
import { Character, PROX } from "~/tokubetsu";

export const tokubetsuRouter = router({
  birthdayToday: procedure.output(z.nullable(Character)).query(({ ctx }) => {
    return ctx.tokubetsu.getBirthdayIdol();
  }),
  birthdaysToday: procedure.output(z.array(Character)).query(({ ctx }) => {
    return ctx.tokubetsu.getBirthdayIdols();
  }),
  proxBirthday: procedure
    .input(z.enum(PROX))
    .output(Character)
    .query(({ input, ctx }) => {
      return ctx.tokubetsu.proxBirthday(input);
    }),
  allCharacters: procedure.output(z.array(Character)).query(({ ctx }) => {
    return ctx.tokubetsu.characters;
  }),
});
