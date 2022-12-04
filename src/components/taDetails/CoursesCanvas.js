import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";


// const courses=[
//     {
//         name: "401-JS-d16",
//         id: 1,
//     },
//     {
//         name: "401-JS-d17",
//         id: 2,
//     },
//     {
//         name: "401-PY-d18",
//         id: 3,
//     },
// ]

export default function CoursesCanvas({ show, setShow,data }) {
  const handleClose = () => setShow(false);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Courses</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {data.map((course) => (
            (<CanvasCard key={course.id} course={course} />)
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

function CanvasCard({course}) {
  return (
    <Card
      bg="danger"
      text={"danger" === "light" ? "dark" : "white"}
      style={{ width: "18rem" , textAlign: "center"}}
      className="mb-2"
    >
      {/* <Card.Header>{course.name}</Card.Header> */}
      <Card.Body>
        <Card.Title> {course.name} </Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
      </Card.Body>
    </Card>
  );
}
