import { Navigate, useRoutes } from "react-router-dom";
import Home from "./Home";
import Page404 from "./Page404";

export default function Routes(){
  return useRoutes(
    [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/notfound",
        element:<Page404/>
      },
      {
        path:"*",
        element:<Navigate to="/notfound"/>
      }
    ]
  )
}