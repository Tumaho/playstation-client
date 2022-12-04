import Dropdown from 'react-bootstrap/Dropdown';
import cookie from 'react-cookies'
import React from 'react'

export default function DropDown() {

  const handleLogout = () =>{
    cookie.remove('token');
  }
    
  return (
    <Dropdown key='up' drop='up'>
    <Dropdown.Toggle className='toggle-style nav-text' >
      <i className="fa fa-ellipsis-h"></i>
      <> More</>
    </Dropdown.Toggle>
  
    <Dropdown.Menu variant="dark">
      <Dropdown.Item href="#/action-3"><i className="fa fa-cogs" ></i> Profile</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="/" className='nav-text' onClick={handleLogout}>   <i className="fa fa-sign-out	"></i>  Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  
  )
}


