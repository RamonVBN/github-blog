import { Outlet } from "react-router";
import { Header } from "./Header";




export function AppLayout(){

    return (<div className=" min-h-[957px] bg-blue-900 ">
        <div className=" m-auto max-w-[1440px] min-h-[957px]   bg-blue-800 ">
            <Header/>
            <Outlet/>
        </div>

    </div>)
}