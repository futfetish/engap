import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Zlang } from "~/types/word";

export const wordRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ word: z.string(), language: Zlang }))
    .mutation(async ({ input, ctx }) => {
      const word = await ctx.db.word.findUnique({
        where: {
          word: input.word,
        },
      });
      if (word) {
        return word;
      }
      const newWord = await ctx.db.word.create({
        data: {
          ...input,
        },
      });
      console.log("ceatwe");
      return newWord;
    }),

  connect: publicProcedure
    .input(
      z.object({
        toID: z.number(),
        fromIDS: z.array(z.number()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log("conneac");
      await ctx.db.word.update({
        where: {
          id: input.toID,
        },
        data: {
          meanings: {
            connect: input.fromIDS.map((id) => ({ id })),
          },
          referencedBy: {
            connect: input.fromIDS.map((id) => ({ id })),
          },
        },
      });

      return {};
    }),
  disconnect: publicProcedure
    .input(
      z.object({
        toID: z.number(),
        fromIDS: z.array(z.number()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.word.update({
        where: {
          id: input.toID,
        },
        data: {
          meanings: {
            disconnect: input.fromIDS.map((id) => ({ id })),
          },
          referencedBy: {
            disconnect: input.fromIDS.map((id) => ({ id })),
          },
        },
      });
      return {};
    }),
  search: publicProcedure
    .input(
      z.object({
        q: z.string().optional(),
        language: Zlang.optional(),
        remembered: z.boolean().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { q, language, remembered } = input;
      const res = await ctx.db.word.findMany({
        where: {
          word: {
            contains: q,
          },
          language,
          remembered,
        },
        orderBy: {
          word: "asc",
        },
      });
      if (!res) {
        return [];
      }
      return res;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      await ctx.db.word.delete({
        where: {
          id: input.id,
        },
      });
      return {};
    }),
  getMeanings: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const word = await ctx.db.word.findUnique({
        where: {
          id,
        },
        select: {
          meanings: {
            orderBy: {
              word: "asc",
            },
          },
        },
      });
      if (!word) {
        return [];
      }
      return word.meanings;
    }),
  getCount: publicProcedure
    .input(
      z.object({
        language: Zlang.optional(),
        remembered: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { language, remembered } = input;
      const count = await ctx.db.word.count({
        where: {
          language,
          remembered,
        },
      });
      return count;
    }),
  getByIndexForPractice: publicProcedure
    .input(
      z.object({
        index: z.number(),
        language: Zlang.optional(),
        remembered: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { index, language, remembered } = input;
      const word = await ctx.db.word.findFirst({
        where: {
          language,
          remembered,
        },
        skip: index - 1,
        include : {
          meanings : true
        }
      });
      return word;
    }),
});
