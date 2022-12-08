import React from "react";
// import TACard from "../Cards/TACard";
import CourseCard from "./card";
import { Row } from "react-bootstrap";



export default function AllCards({data}) {
  return (
    <Row xl={4}>
      {data &&data.map((item) => (
        <CourseCard key={item.id} data={item} />
      ))}
    </Row>
  );
}
