import React from "react";
import TACard from "../Cards/TACard";
import { Row } from "react-bootstrap";



export default function CardsSection({data}) {
  return (
    <Row xs={11}>
      {data &&data.map((item) => (
        <TACard key={item.id} data={item} />
      ))}
    </Row>
  );
}
