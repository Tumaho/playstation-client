import { TimePicker } from 'react-ios-time-picker';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



function FormPS() {
    const [value, setValue] = useState('10:00');
    console.log("VALUE :", value);
    const onChange = (timeValue) => {
        setValue(timeValue);
    }

    return (

        <Form>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <DropdownButton
                    variant="outline-secondary"
                    title="Device Number"
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item >1</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >2</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >3</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >4</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >5</Dropdown.Item>
                </DropdownButton>
            </Form.Group>

            <Form.Group className="mb-3">
                <DropdownButton
                    variant="outline-secondary"
                    title="Playstation Type"
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item >4</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >5</Dropdown.Item>
                </DropdownButton>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:"20%"}}>
                <Form.Label>Price Per Hour</Form.Label>
                <Form.Control type="number" placeholder="Enter price" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="datetime-local" placeholder="Enter price" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    );
}

export default FormPS;
