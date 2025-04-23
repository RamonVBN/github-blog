import { ArrowSquareOut, Buildings, GithubLogo, Users } from "phosphor-react";
import { CardHeader } from "../components/CardHeader";
import { PostCard } from "../components/PostCard";
import { api } from "../services/api";
import { useEffect, useState } from "react";

type UserInfos = {
    avatar: string
    realName: string
    username: string
    bio: string
    company: string
    followers: number
    url: string
}

export function Blog(){

    const [profile, setProfile] = useState<UserInfos>({
        avatar: '',
        realName: '',
        username: '',
        bio: '',
        company:'',
        followers: 0,
        url:'',
    
    })
    
    const [inputQuery, setInputQuery] = useState('')

    const [items, setItems] = useState<any[]>()
    
    async function fetchApiUsers(){
        const response = await api.get('/users/ramonvbn')
        
        setProfile({
            avatar: response.data.avatar_url,
            bio: response.data.bio,
            company: response.data.company,
            followers: response.data.followers,
            realName: response.data.name,
            url: response.data.html_url,
            username: response.data.login

        })
    }

    async function fetchApiIssues(){
        // const response = await api.get(`search/issues?q=teste%20repo:ramonvbn/github-blog`)

        const response = await api.get(`search/issues`, {
            params: {
                q: `${inputQuery} repo:ramonvbn/github-blog`
            }
        })

        console.log(response.data)

        setItems(response.data.items)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        fetchApiIssues()

    }


    useEffect(() => {

        fetchApiUsers()
        fetchApiIssues()
        
    }, [])


    return (
        <>
        <CardHeader>
        <img className="w-[148px] h-[148px]  rounded-[10px]" src={profile.avatar} />

    <div className="flex flex-col gap-5 w-[608px]">

    <div className="flex flex-col gap-2">
        <span className="flex justify-between">
            <h1 className="font-display font-bold text-2xl leading-[130%] text-white-100">{profile.realName}</h1>
            <a className=" flex items-baseline  gap-1 font-display font-bold text-[12px] leading-[160%] text-blue-100" target="_blank" href={profile.url}>
                GITHUB
                <ArrowSquareOut className="text-blue-100" size={12} weight="bold" />
                </a>
        </span>
        <p className=" max-w-[612px] font-display font-normal text-[16px] leadiing-[160%] text-cyan-100">{profile.bio}</p>
        </div>

        <div className="flex gap-4">
        <div className="flex items-center gap-2">
            <GithubLogo className="text-gray-200" size={18} weight="fill" />
            <span className="font-display font-normal text-[16px] leading-[160%] text-white-300  ">
                {profile.username}
            </span>
        </div>

        <div className="flex items-center gap-2">
            <Buildings className="text-gray-200" size={18} weight="fill" />
            <span className="font-display font-normal text-[16px] leading-[160%] text-white-300  ">
                {profile.company}
            </span>
        </div>

        <div className="flex items-center gap-2">
            <Users className="text-gray-200" size={18} weight="fill" />
            <span className="font-display font-normal text-[16px] leading-[160%] text-white-300  ">
                {profile.followers} seguidores
            </span>
        </div>

        </div>


        </div>
        </CardHeader>
        
    <main className="w-full flex justify-center">

        <div className="w-[864px] mb-15 flex flex-col gap-4">

            <div className="w-full flex justify-between ">
                <h3 className="font-display text-[18px] font-bold leading-[130%] text-white-300">Publicações</h3>
                <span className="font-display text-[14px] leading-[160%] text-cyan-100">{items?.length} {items?.length && items.length > 1? 'publicações': 'publicação'}</span>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="w-full">
                <input onChange={(e) => setInputQuery(e.target.value) } value={inputQuery} placeholder="Buscar conteúdo" className="w-full h-[50px] p-4 text-gray-200 bg-blue-900 placeholder:text-gray-200" type="text" />
                </form>

            
            <div className="w-full mt-6 flex flex-wrap gap-8 ">
                {
                    items?.map((item, index) => <PostCard key={index} createdAt={item.created_at
                    } issueNumber={item.number} body={item.body} title={item.title}/>)
                }
                
            </div>
                

        </div>
    </main>
    </>)
}