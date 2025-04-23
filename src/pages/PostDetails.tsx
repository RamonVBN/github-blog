import {NavLink, useNavigate, useParams } from "react-router"
import { CardHeader } from "../components/CardHeader"
import { ArrowSquareOut, CaretLeft, GithubLogo, CalendarBlank, ChatCircle } from "phosphor-react"
import { api } from "../services/api"
import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Markdown from "react-markdown"
import { AxiosError } from "axios"

type IssueDetailsProps = {

    title: string
    issueUrl: string
    comments: number
    body: string
    username: string
    createdAt: string
}

export function PostDetails(){

    const navigate = useNavigate()
    
    const {issueNumber} = useParams()

    const [issue, setIssue] = useState<IssueDetailsProps>({
        title: '',
        issueUrl: '',
        comments: 0,
        body: '',
        username: '',
        createdAt: ''
    })


    async function fetchIssue(){
        
        try {
        const response = await api.get(`repos/ramonvbn/github-blog/issues/${issueNumber}`)
        setIssue({
            title: response.data.title,
            issueUrl: response.data.html_url,
            comments: response.data.comments,
            body: response.data.body,
            username: response.data.user.login,
            createdAt: response.data.created_at

        })
        } catch (error) {
            
            if (error instanceof AxiosError) {
                
                
                return navigate('/github-blog/')
            }
        }
       
        
        
        
    }

    useEffect(() => {
        fetchIssue()
    }, [])

    return (
        <>
        <CardHeader>
            <div className="w-full flex flex-col gap-5 ">
                <div className="w-full flex justify-between">
                    <NavLink className="flex items-baseline gap-1" to={'/github-blog/'}>
                    <CaretLeft className="text-blue-100" weight="bold" size={12}/>
                    <span className="text-blue-100 font-bold font-display text-[12px] leading-[160%]
                    ">VOLTAR</span>
                    </NavLink>
                    <a className=" flex items-baseline  gap-1 font-display font-bold text-[12px] leading-[160%] text-blue-100" target="_blank" href={issue.issueUrl}>
                    VER NO GITHUB
                    <ArrowSquareOut className="text-blue-100" size={12} weight="bold" />
                    </a>
                </div>

                    <div className="flex flex-col gap-2.5 items-start">
    
                    <h1 className="font-display font-bold text-2xl leading-[130%] text-white-100">
                       {issue?.title} </h1>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                        <GithubLogo className="text-gray-200" size={18} weight="fill" />
                        <span className="font-display font-normal text-[16px] leading-[160%] text-white-300  ">
                        {issue.username}
                        </span>
                        </div>

                        <div className="flex items-center gap-2">
                        <CalendarBlank className="text-gray-200" size={18} weight="fill" />
                        <span className="font-display font-normal text-[16px] leading-[160%] text-white-300  ">
                        {issue.createdAt?  formatDistanceToNow(issue.createdAt, {addSuffix: true, locale: ptBR}): ''}
                        </span>
                        </div>

                        <div className="flex items-center gap-2">
                        <ChatCircle className="text-gray-200" size={18} weight="fill" />
                        <span className="font-display font-normal text-[16px] leading-[160%] text-white-300  ">
                        {issue.comments} comentários
                        </span>
                        </div>

                    </div>

                    </div>
            </div>

        </CardHeader>
        <main className="w-full h-full flex justify-center  font-display font-normal text-[16px] leading-[160%] text-white-200 text-justify indent-8">
            <div className="max-w-[864px]">
                <Markdown >
                {issue.body}
                </Markdown>
            </div>
        </main>
        </>
    )
}