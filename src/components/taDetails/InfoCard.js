import React from "react";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

const placeholder = ``;

export default function InfoCard({ data, header, title }) {
  return (
    <Col xl={4} lg={4} md={6} sm={6} xs={12}>
      <Card
        bg={"warning"}
        key={"Warning"}
        text={"warning" === "light" ? "dark" : "white"}
       style={cardStyle}
        className="mb-2"
      >
        <Card.Header style={{ textAlign: "center", background:"#FDA629"  }}>{header}</Card.Header>
        <Card.Body style={{background:"purple"}}>
          <Card.Title style={{ textAlign: "center" }}> {title} </Card.Title>
          <Card.Text>{data || placeholder}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

const cardStyle={
    marginInline: "8%",

}
