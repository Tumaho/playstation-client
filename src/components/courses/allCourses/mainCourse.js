import React, { useEffect, useState } from "react";
import SearchBar from "../../searchBar/SearchBar";
// import CardsSection from "../cardsSection/CardsSection";
import AllCards from "./cardsLoop";
import { Col } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import SideBar from "../../sideBar/SideBar"
let allCourses;

const getData = async () => {
    const { data } = await axios.get(
        "https://worker-production-87fe.up.railway.app/api/v1/courses/getallcourses"
    );
    allCourses = data.courses;
    console.log("allCourses : ", allCourses);
    return data.courses;
};
export default function MainCourses() {

    useEffect(() => {
        getData().then((data) => {
            setCourses(data);
        });
    }, []);
    const [courses, setCourses] = useState([]);

    const onSearchSubmit = (term) => {
        // real search will be here

        setCourses(realSearch(term));
    };

    return (
        <>
            <div style={{ margin: "0 8% 10% 17%" }}>

                <SearchBar onSearchSubmit={onSearchSubmit} />
                <Col xs={12} lg={12} xl={11}>
                    <AllCards data={courses} />
                </Col>


            </div>

            <div>
                <SideBar />{" "}
            </div>
        </>
    );
}

function realSearch(term = "") {
    // will search if the term is in the name  or id
    if (term === "") {
        return allCourses;
    }

    return allCourses.filter(
        (item) =>
            item.courseName.toLowerCase().includes(term.toLowerCase()) ||
            item._id.toString().includes(term)
    );

    // will search if the term is in the name or title without case sensitive

    // return allCourses.filter(item => item.name.toLowerCase().includes(term.toLowerCase())
    // || item._id.toString().includes(term)
    // ||item.assignedCourses[0].toLowerCase().includes(term.toLowerCase()));
}
