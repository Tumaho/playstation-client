import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Details from './details'

export default function TicketModal(props) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.setTicketDetails(false)
    }
    // const handleShow = () => setShow(true);

    console.log("PROPS       :", props.row);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket's Details</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <p>Open At: {props.row.openAt}</p>
                    <p>Claimed At : {props.row.claimedAt}</p>
                    <p>Closed At: {props.row.closedAt}</p>
                    <p>Student Name: {props.row.studentName}</p>
                    <p>Student ID: {props.row.studentId}</p>
                    <p>Claimer Name: {props.row.claimerName}</p>
                    <p>Claimer ID: {props.row.claimerId}</p>
                    <p>Course Name: {props.row.courseName}</p>
                    <p>Description: {props.row.description}</p>
                    <p>Ticket ID: {props.row.id}</p>
                    
                    
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}