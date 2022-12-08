import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function CourseCard({data}) {
//   let navigate = useNavigate();

  const handleClick = () =>{
    // navigate(`/course/${data.id}`);
    console.log(data);
  }

  return (
    <Col  xs={9} sm={6}  md={4} lg={3} xl={4} style={{marginBottom:"10px"}}>
      <Card  style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} border="warning">
    <Card.Body>
      <Card.Title style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} >{data.courseName}</Card.Title>
      <Card.Text>
          {data.status}
      </Card.Text>
      <Button style={{background:"#F5A427",border:"0"}} onClick={handleClick}>more info </Button>
    </Card.Body>
  </Card>
  </Col>
  )
}
