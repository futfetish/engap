import { z } from "zod";

export const Zlang = z.enum(['english' , 'russian'])



export type Lang = z.infer<typeof Zlang>



export interface Word  {
    id: number;
    word: string;
    createdAt: Date;
    language: Lang;
    remembered: boolean;
}

export interface WordDTO {
    id: number;
    word: string;
    language: Lang;
    remembered: boolean;
}