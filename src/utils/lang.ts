import { Lang } from "~/types/word"

export const reverseLang = (lang : Lang) => {
    if(lang == 'english'){
        return 'russian'
    } else{
        return 'english'
    }
} 