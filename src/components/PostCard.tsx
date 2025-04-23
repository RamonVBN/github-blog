import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useNavigate } from "react-router"

type PostCardProps = {

    title: string
    body: string
    issueNumber: number
    createdAt: string

}

export function PostCard({body, title, issueNumber, createdAt}: PostCardProps){

    const navigate = useNavigate()

    if (body.split(' ').length > 25) {
        

        body = body.split(' ').slice(0, 26).join(' ')
        
    }

    return (<div onClick={() => navigate(`/details/${issueNumber}`)} className="w-[416px] h-[260px] cursor-pointer bg-blue-600 rounded-[10px] p-9 flex flex-col gap-5">
        <div className="flex justify-between">
            <h2 className=" max-w-[283px] font-display font-bold text-xl leading-[160%] text-white-100 ">{title}</h2>
            
            <span className="font-display text-[14px] leading-[160%] text-cyan-100">{formatDistanceToNow(createdAt,{addSuffix: true, locale: ptBR}  )}</span>
        </div>

        <p className="font-display font-normal text-[16px] leading-[160%] text-white-200">
            {body}...
        </p>
        
    </div>)
}