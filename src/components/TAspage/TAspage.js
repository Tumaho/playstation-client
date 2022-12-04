import React, { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import CardsSection from "../cardsSection/CardsSection";
import { Col } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
let allTas;

const getData = async () => {
  const { data } = await axios.get(
    "https://worker-production-87fe.up.railway.app/api/v1/ta"
  );
  allTas = data.data.result;
  return data.data;
};
export default function TAspage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData().then((data) => {
      setTas(data.result);
      setLoading(false);
    });
  }, []);
  const [tas, setTas] = useState([]);

  const onSearchSubmit = (term) => {
    // real search will be here

    setTas(realSearch(term));
  };

  return (
    <div>
      {loading ? (
        <>
          <div style={{ display: "flex ", justifyContent: "center" }}>
            <Spinner
              animation="grow"
              variant="warning"
              style={{ margin: "10% auto  ", width: "100px", height: "100px" }}
            />
          </div>
        </>
      ) : (
        <>
          <SearchBar onSearchSubmit={onSearchSubmit} />
          <Col xs={12} lg={12} xl={11}>
            <CardsSection data={tas} />
          </Col>
        </>
      )}
    </div>
  );
}

function realSearch(term = "") {
  // will search if the term is in the name  or id
  if (term === "") {
    return allTas;
  }

  return allTas.filter(
    (item) =>
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item._id.toString().includes(term)
  );

  // will search if the term is in the name or title without case sensitive

  // return allTas.filter(item => item.name.toLowerCase().includes(term.toLowerCase())
  // || item._id.toString().includes(term)
  // ||item.assignedCourses[0].toLowerCase().includes(term.toLowerCase()));
}
