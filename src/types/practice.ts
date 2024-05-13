import { z } from "zod";
import { Zlang } from "./word";

export const ZMode = z.enum(["shuffle", "random"]);

export type Mode = z.infer<typeof ZMode>;

export const ZPracticeLang = z.union([z.literal("both"), Zlang]);

export type PracticeLang = z.infer<typeof ZPracticeLang>;
