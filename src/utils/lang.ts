import { Lang } from "~/types/word"

export const reverseLang = (lang : Lang) => {
    if(lang == 'eng'){
        return 'rus'
    } else{
        return 'eng'
    }
} 