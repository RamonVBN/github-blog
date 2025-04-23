import { Routes, Route } from "react-router";
import { AppLayout } from "./AppLayout";
import { Blog } from "../pages/Blog";
import { PostDetails } from "../pages/PostDetails";



export function Router(){


   return (<Routes>

        <Route path="/github-blog/" element={<AppLayout/>}>

            <Route path="/github-blog/" element={<Blog/>}/>
            <Route path="/github-blog/details/:issueNumber" element={<PostDetails/>}/>
        </Route>

    </Routes>)
}
