import React, { useState } from "react";
import { Link } from "react-router-dom";
import cookie from 'react-cookies'
import "./sidebar.css";
import DropDown from "./DropDown";

import { useNavigate } from "react-router-dom";



const mobileViewWidth = "990";

// DATA FILE
const SidebarData = [
  {
    title: "Profile",
    path: "/profile",
    icon: <i className="fa fa-cogs" ></i>,
    cName: "nav-text",
  },
  {	

    title: "More",
    icon: <DropDown/>,
    cName: "nav-text",
  },
  {
    title: "Staff",
    path: "/main",
    icon: <i className="fa fa-area-chart"></i>,
    cName: "nav-text",
  },
  {
    title: "Students",
    path: "/students",
    icon: <i className="fa fa-group" ></i>,
    cName: "nav-text",
  },
];

// STYLES

export default function SideBar() {
  const [sidebar, setSidebar] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  let navigate = useNavigate();

  let handleResize = (e) => {
    setWidth(window.innerWidth);
  };

  const handleLogout = ()=>{
    console.log('====================================');
    console.log("logout");
    console.log('====================================');
    cookie.remove('token');
  }
  window.addEventListener("resize", handleResize);

  const showSidebar = () => setSidebar(!sidebar);

  return (
   
        <nav
          className="nav-menu active"
          onMouseEnter={showSidebar}
          onMouseLeave={showSidebar}
        >
          <ul className="nav-menu-items">
            <div className="items_group">
              {SidebarData.map((item, index) => {
                if (width < mobileViewWidth && item.title === "Profile") {
                  return "";
                }
                if (width < mobileViewWidth && item.title === "More") {
                  return (
                    <li key={index} className={item.cName} onClick={()=>navigate(item.path)}>
                      {item.icon}
                      {width < mobileViewWidth || sidebar ? (""
                      ) : (
                        <></>
                      )}
                    </li>
                  );
                }
                if (width > mobileViewWidth && item.title === "More") {
                  return "";
                } else {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        {width < mobileViewWidth || sidebar ? (
                          <span>{item.title}</span>
                        ) : (
                          <></>
                        )}
                      </Link>
                    </li>
                  );
                }
              })}
            </div>
            <li key={-1} className="nav-text logout_item" onClick={handleLogout}>
              <Link to="/">
              <i className="fa fa-sign-out	"></i>
                {width < mobileViewWidth || sidebar ? (
                 < span>Logout</span>
                ) : (
                  <></>
                )}
              </Link>
            </li>
          </ul>
        </nav>
  );
}

