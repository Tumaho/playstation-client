import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap'




export default function MainCards() {


  const handleClick = () => {
    // navigate(`/ta/${data.id}`);
    console.log("NAVIGATE");
  }

  return (
    <>
      <Col xs={9} sm={6} md={4} lg={3} style={{ marginBottom: "10px" }}>
        <Card style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <Card.Img src='https://thebusinessofesports.com/wp-content/uploads/2022/05/unnamed-1.jpg' variant="top" />
          <Card.Body>
            <Card.Title style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} >Playstation</Card.Title>

            <Button style={{ background: "#F5A427", border: "0" }} onClick={handleClick}>more info </Button>
          </Card.Body>
        </Card>
      </Col>


      <Col xs={9} sm={6} md={4} lg={3} style={{ marginBottom: "10px" }}>
        <Card style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <Card.Img src='https://www.tasteofhome.com/wp-content/uploads/2019/05/shutterstock_273975992.jpg' variant="top" />
          <Card.Body>
            <Card.Title style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} >Orders</Card.Title>

            <Button style={{ background: "#F5A427", border: "0" }} onClick={handleClick}>more info </Button>
          </Card.Body>
        </Card>
      </Col>

    </>
  )
}


