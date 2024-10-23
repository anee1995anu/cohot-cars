import {
    createBrowserRouter
  } from "react-router-dom";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import Car from "../pages/user/Car";
import Cart from "../pages/user/Cart";
import Signuppage from "../pages/shared/Signup";
import Cardetails from "../pages/user/Cardetails";
import LoginPage from "../pages/shared/Loginpage";
import Userlayout from "../layout/UserLayout";
import Errorpage from "../pages/user/ErrorPage";







export const router = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout/>,
       errorElement:<Errorpage/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'about',
          element:<About/>
        },
        {
          path:'contact',
          element:<Contact/>
        },
        {
          path:'car',
          element:<Car/>
        },
        {
          path:'car-details/:id',
          element:<Cardetails/>
        },
        {
          path:'cart',
          element:<Cart/>

        },
        {
          path:'login',
          element:<LoginPage/>
        },
        {
          path:'sign-up',
          element:<Signuppage/>
        }
      ]
    },
  ]);