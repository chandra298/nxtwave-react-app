export default function Card({cardData}){
  return(
    <>
      <div style={{display:"flex",flexDirection:"column",rowGap:"10px",padding:"10px 10px",border:"1px solid #005",borderRadius:"5px",width:"100%",background:"white"}}>
        <p>{cardData?.name}</p>
        <p>{cardData?.description}</p>
      </div>
    </>
  )
}