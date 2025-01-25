import axios from "axios"
import { Button,message, Modal } from "antd"
import Card from "./components/CardComponent"
import { useEffect, useState } from "react";

export default function Home(){

  const [messageApi, contextHolder] = message.useMessage();

  const [formattedList, setFormattedList] = useState({});
  const [columns, setColumns] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };  

    const fetchListItems = async()=>{
      try{
        let res = await axios.get("https://apis.ccbp.in/list-creation/lists");
        if(res?.status === 200){
          messageApi.success("Successfully fetched all list items");
          let result = res?.data["lists"];
          let columns = [];
          let formatteList = result.reduce((accumulator, card)=>{
            if(accumulator[card?.list_number]){
              accumulator[card?.list_number].push(card);
            }
            else{
              columns.push(card?.list_number);
              accumulator[card?.list_number] = [card];
            }
            return accumulator;
          },{})
          setFormattedList(formatteList);
          columns.sort((a,b)=>a-b);
          setColumns(columns);
        }
        else{
          messageApi.error("Unable to fetch list items")
        }
      }
      catch(err){
        console.log("error occurred",err)
        messageApi.error("Error occurred while fetching list items")
      }
      
    }

    useEffect(()=>{
      fetchListItems()
    },[])

    const ModalComponent = ()=>{
      return(
        <Modal title="List Items" open={isModalOpen} onOk={handleOk} width="1000%" onCancel={handleCancel} okText="update">
          <div style={{display:"flex",justifyContent:"flex-start",width:"800px",marginTop:"50px",columnGap:"20px"}}>
            {displayLists([1,0,2])}
          </div>        
      </Modal>
      )
    }

    const displayLists = (columnList)=>{
      return(
        <>
        {
          columnList.map((columnNumber)=>{
            return(<div style={{width:formattedList[columnNumber]?"initial":"250px",display:"flex",flexDirection:"column",alignItems:"start",border:"1px solid #005",borderRadius:"10px",padding:"10px 20px",background:"#EEF6FD",rowGap:"10px",height:"400px",overflowY:"scroll"}}>
              <div style={{marginBottom:"20px",display:"flex",flexDirection:"row",alignItems:"center",columnGap:"10px"}}><input type="checkbox"/><h3>{formattedList[columnNumber]?`List ${columnNumber}`:"New List"}</h3></div>
              {
                formattedList[columnNumber] && formattedList[columnNumber].map((cardData)=>{
                  return (
                    <>
                    <Card cardData={cardData}/>
                    </>
                  )
                })
              }
              
            </div>)
          })          
        }
        </>
      )
    }

  return(
    <>
      {contextHolder}
      {ModalComponent()}
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",rowGap:"10px",marginTop:"50px"}}>
        <h2>List Creation</h2>
        <Button onClick={showModal} type="primary">Create a new list</Button>
        <div style={{display:"flex",justifyContent:"flex-start",width:"100%",marginTop:"50px",columnGap:"20px"}}>
          {displayLists(columns)}
        </div>
      </div>
    </>
  )
}