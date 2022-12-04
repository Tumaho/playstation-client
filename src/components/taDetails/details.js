import { Row } from "react-bootstrap";
import InfoCard from "./InfoCard";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CoursesCanvas from "./CoursesCanvas";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { useParams } from 'react-router-dom';
import moment from 'moment'
import { Spinner } from "react-bootstrap";
import TicketsTableFunction from "./TicketsTableFunction";
import SideBar from "../sideBar/SideBar";
import TicketModal from './ticketDetailsModal';


const getData = async (id) => {
    const { data } = await axios.get(
        `https://worker-production-87fe.up.railway.app/api/v1/ta/${id}`
    );
    return data.data;
};

export default function Details() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [ta, setTa] = useState({});
    const [tickets, setTickets] = useState({})
    const [show, setShow] = useState(false);
    const [ticketDetails, setTicketDetails] = useState(false);
    const [row, setRow] = useState({});
    const handleShow = () => setShow(true);

    useEffect(() => {
        getData(id).then((data) => {
            setTa(data.ta);
            setTickets(data.tickets);
            setLoading(false);
        });

        // console.log("ticketsssssss :",ticketDetails);
    }, []);


    return (
        <>
         <SideBar style={{ zIndex: "100" }} />
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
                    {
                        ta.tickets && (
                            <>



                                <div style={{ marginInline: "10%", marginBottom: "10%" }}>
                                    <ProfileCard data={ta} />
                                    <Row xs={12} lg={12} xl={11}>
                                        <InfoCard header="Employee ID" title={ta.id} />
                                        <InfoCard header="Joining Date" title={moment(ta.hired).format("MMMM Do YYYY")} />
                                        <InfoCard header="Current Course" title={ta.currentCourses[0]} />

                                        {/* ---------------------------------------------------------------------------------------------------------------------- */}
                                        <hr></hr>
                                        <InfoCard header="Last Claimed Ticket" title={moment(ta.lastClamed).format("MMMM Do YYYY, h:mm a")} />
                                        <InfoCard header="Total Tickets" title={tickets.length} />
                                        <InfoCard header="Rate" title={ta.rate} />

                                    </Row>
                                    <hr></hr>
                                    <Button variant="primary" onClick={handleShow} className="a">
                                        Assigned Courses
                                    </Button>
                                    <CoursesCanvas show={show} setShow={setShow} data={ta.assignedCourses} />
                                    <TicketsTableFunction products={tickets.tickets} setTicketDetails={setTicketDetails} ticketDetails={ticketDetails} setRow={setRow} />



                                </div>

                                {ticketDetails && (
                                    <TicketModal row={row} setTicketDetails={setTicketDetails} />
                                )}



                            </>

                        )
                    }
                </>
            )}


        </>

    );
}
// margin auto bootstrap
// https://stackoverflow.com/questions/20035101/centering-a-div-with-bootstrap