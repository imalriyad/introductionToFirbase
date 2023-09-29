import { createBrowserRouter } from "react-router-dom";
import Layout from "./Component/Layout";
import SignIn from "../Module50/SignIn";
import SignUp from "../Module50/SignUp";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                path:'/signin',
                element:<SignIn></SignIn>
            },
            {
                path:'/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])

export default router