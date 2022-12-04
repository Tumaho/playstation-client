import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function TACard({data}) {
  let navigate = useNavigate();

  const avatarHandler=(avatar)=>{
		if(!avatar){
			// return the default avatar
			return "https://icons.iconarchive.com/icons/mahm0udwally/all-flat/128/User-icon.png"; 
		}
		if(avatar.startsWith("http")){
			return avatar
		}else{
			return `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`
		}
	}
  function addDefaultSrc(ev){
    ev.target.src = "https://icons.iconarchive.com/icons/mahm0udwally/all-flat/128/User-icon.png"
  }

  const handleClick = () =>{
    navigate(`/ta/${data.id}`);
  }

  return (
    <Col  xs={9} sm={6}  md={4} lg={3} style={{marginBottom:"10px"}}>
      <Card  style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
    <Card.Img variant="top" src={avatarHandler(data.avatar)} onError={(e)=>addDefaultSrc(e)} />
    <Card.Body>
      <Card.Title style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} >{data.name}</Card.Title>
      <Card.Text>
          {data.title}
      </Card.Text>
      <Card.Text>
          {data.course}
      </Card.Text>
      <Button style={{background:"#F5A427",border:"0"}} onClick={handleClick}>more info </Button>
    </Card.Body>
  </Card>
  </Col>
  )
}


