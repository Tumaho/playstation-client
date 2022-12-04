import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import "./search-Bar.css";
export default function SearchBar({onSearchSubmit}) {
  

  const handleSearch=(e)=>{
    onSearchSubmit(e);
  }
  return (
    <div className='search_bar'>
        <InputGroup size="lg" onChange={e => handleSearch(e.target.value)}
            value="">
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Search by name or id"
        />
        <InputGroup.Text id="inputGroup-sizing-lg"  >Search</InputGroup.Text>
      </InputGroup >
      </div>
  )
   
}
