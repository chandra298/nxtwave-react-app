import { Button } from "antd"
import { useNavigate } from "react-router-dom"

export default function Page404(){

  const navigate = useNavigate();

  return(
    <>
      <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <div style={{display:"flex",flexDirection:"column", alignItems:"center",rowGap:"20px"}}>
          <p style={{fontSize:"30px",fontWeight:300,color:"#0005"}}>Not found</p>
          <Button type="primary" style={{width:"max-content"}} onClick={()=>navigate("/")}>
            Home
          </Button>
        </div>
      </div>
    </>
  )
}