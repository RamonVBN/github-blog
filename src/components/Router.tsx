import { Routes, Route } from "react-router";
import { AppLayout } from "./AppLayout";
import { Blog } from "../pages/Blog";
import { PostDetails } from "../pages/PostDetails";



export function Router(){


   return (<Routes>

        <Route path="/" element={<AppLayout/>}>

            <Route path="/" element={<Blog/>}/>
            <Route path="/details/:issueNumber" element={<PostDetails/>}/>
        </Route>

    </Routes>)
}
