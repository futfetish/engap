import { useRouter } from "next/router"

export default function PracticeProcessP(){
    const router = useRouter()
    console.log(router.query)
    return <div></div>
}