import { ReactNode } from "react";



export function CardHeader({children}: {children: ReactNode}){
    return (<div className=" drop-shadow-class bg-blue-700 w-[864px] max-h-[212px] m-auto rounded-[10px] translate-y-[-50%] p-10 flex items-center gap-7 ">

        {children}

    </div>)
}