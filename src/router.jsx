import { useRoutes } from "react-router-dom";
import Home from "./Home";

export default function Routes(){
  return useRoutes(
    [
      {
        path:"/",
        element:<Home/>
      }
    ]
  )
}