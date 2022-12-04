import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Select from "react-select";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import filterFactory, {
  Comparator,
  customFilter,
  FILTER_TYPES,
} from "react-bootstrap-table2-filter";
import { contextMenu, Item, Menu, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import memoize from "memoize-one";
import {Form} from 'react-bootstrap';

let filters = [];

export default function TicketsTableFunction(props) {
  const [filter, setFilter] = React.useState(false);
  const [portalReady, setPortalReady] = React.useState(false);
  const [activeRow, setActiveRow] = React.useState(null);
  const [data, setData] = React.useState(props.products);
  const startDate=useRef();
  const endDate=useRef();
  let portal = useRef(null);

  useEffect(() => {
    setPortalReady(true);

  }, []);


 
  const DateHandler=(e)=>{
    let date1=startDate.current.value;
    let date2=endDate.current.value;
    setData(props.products);
    // filter data using date1 and date2 if they are not empty and if one of them changes then return all data befor filtering again
    if(date1!=="" && date2!==""){
      let filteredData=props.products.filter((item)=>{
       let date=item.claimedAt.split("T")[0];
        return date>=date1 && date<=date2;
      })
      setData(filteredData);
      
    }else if (date1){
      let filteredData=props.products.filter((item)=>{
        let date=item.claimedAt.split("T")[0];
        return date>=date1;
      })
      setData(filteredData);

    }
    else if (date2){
      let filteredData=props.products.filter((item)=>{
        let date=item.claimedAt.split("T")[0];
        return date<=date2;
      })
      setData(filteredData);
    }
    else{
      setData(props.products);
    }


  }
  let ref = useRef(null);
  const getTextFilter =memoize(
    (onFilter, column) => {
      let clearFilter = () => {
        onFilter();
        if (ref.current) {
          console.log("inside :",ref.current.value);
          ref.current.value = "";
        }
      };
      filters.push(clearFilter);
      return portalReady
        ? ReactDOM.createPortal(
            <Col style={{ zIndex: "100" }} onClick={(e) => e.stopPropagation()}>
              <FormControl
                ref={ref}
                placeholder={column.text}
                className="filter"
                onChange={(event) => onFilter(event.target.value)}
              />
            </Col>,
            document.getElementById("filter-container")
          )
        : null;
    }
  )

  const getCustomFilter = memoize((onFilter, column, products) => {
    let clearFilter = () => {
      // ref.current.value = "";
      console.log("inside 2:",ref.current.value);
      onFilter();
      if (ref.current) {
        ref.current.value = "";
      }
    };
    filters.push(clearFilter);
    let options = [...new Set(products.map((field) => field[column.dataField]))]
      .sort((a, b) => {
        if (typeof a === "number") {
          return a - b;
        } else {
          return a < b ? -1 : 1;
        }
      })
      .map((entry) => ({
        label: entry,
        value: entry,
      }));
    return portalReady
      ? ReactDOM.createPortal(
          <Col style={{ zIndex: "100" }} onClick={(e) => e.stopPropagation()}>
            <Select
              ref={ref}
              placeholder={column.text}
              isClearable
              isMulti
              options={options}
              className="filter"
              onChange={(event) => onFilter(event.map((entry) => entry.value))}
            />
          </Col>,
          document.getElementById("filter-container")
        )
      : null;
  })

  const renderDropDown = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => {
    return (
      <Row>
        <Col md={4}>
          <Select
            defaultValue={{ label: 5, value: 5 }}
            isSearchable={false}
            styles={customStyles}
            onChange={(selected) => {
              onSizePerPageChange(selected.value);
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: "5px",
              backgroundColor: "#0d6efd",
            })}
            options={[
              { label: 5, value: 5 },
              { label: 10, value: 10 },
              { label: 15, value: 15 },
              { label: "All", value: data.length },
            ]}
          />
        </Col>
        <Col
          md={8}
          ref={portal}
          className="justify-content-center align-self-center"
        ></Col>
      </Row>
    );
  };

  const renderPaginationTotal = (start, to, total) =>
    portalReady
      ? ReactDOM.createPortal(
          <span>
            {start} to {to} of {total}
          </span>,
          portal.current
        )
      : null;

  const showContext = (event, row) => {
    setActiveRow(row);
    event.preventDefault();
    contextMenu.show({
      id: "context-menu",
      event: event,
    });
  };
  const rowEvents = {
    onClick: (e, row, index) => setActiveRow(row),
    onContextMenu: (e, row, index) => {
      showContext(e, row);
    },
  };

  const pagination = paginationFactory({
    sizePerPage: 5,
    firstPageText: "First",
    lastPageText: "Last",
    alwaysShowAllBtns: true,
    showTotal: true,
    pageListRenderer: renderPageList,
    paginationTotalRenderer: renderPaginationTotal,
    sizePerPageRenderer: renderDropDown,

  });

  const rowStyle = (row) => {
    if (row === activeRow) {
      return {
        backgroundColor: "lightcyan",
        border: "solid 2px grey",
        color: "purple",
      };
    }
  };
  const columns = [
    {
      sort: true,
      dataField: "id",
      text: "Ticket ID",
      style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
    },
    {
      sort: true,
      dataField: "courseName",
      text: "Course",
      filter: customFilter({
        type: FILTER_TYPES.TEXT,
      }),
      filterRenderer: (onFilter, column) => getTextFilter(onFilter, column),
      style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
    },
    {
      sort: true,
      dataField: "studentName",
      filter: customFilter({
        type: FILTER_TYPES.MULTISELECT,
      }),
      filterRenderer: (onFilter, column) =>
        getCustomFilter(onFilter, column, data),
      text: "Creator",
      style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
    },
    // {
    //   sort: true,
    //   dataField: "claimerName",
    //   filter: customFilter({
    //     type: FILTER_TYPES.MULTISELECT,
    //     comparator: Comparator.EQ,
    //   }),
    //   filterRenderer: (onFilter, column) =>
    //     getCustomFilter(onFilter, column, props.products),
    //   text: "Claimer",
    //   style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
    // },
    {
      dataField: "more info",
      text: "More Info",
      formatter: (cell, row) => {
        return (
          <div>
            <Button
              variant="outline-primary"
              onClick={() => {
                props.setTicketDetails(true)
                props.setRow(row)
                console.log(row);
              }}
            >
              details
            </Button>
          </div>
        );
      },
    },

  
  ];

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
      }}
    >
      <Row style={{ margin: "5px" }}>
        <Col>
          <Button
            className="btn btn-default w-100 shadow-none"
            onClick={() => setFilter(!filter)}
          >
            Filter
          </Button>
        </Col>
        <Col sm={{ span: 4, offset: 4 }} className="align-self-center">
          <Button
            hidden={!filter}
            className="btn btn-info text-white w-100 shadow-none"
            onClick={() => {
              filters.forEach((filter) => filter());
              // console.log("INPUT : ",document.getElementsByTagName("input"));

              let inputs=document.getElementsByTagName("input")
              let divs=document.getElementById("filter-container")
             console.log(divs);
              Object.keys(inputs).forEach((key) => {
                inputs[key].value = "";
              });
              setData(props.products)
              
            }}
          >
            Clear Filter
          </Button>
        </Col>
      </Row>
      <legend />

      <Row hidden={!filter} id="filter-container">
      
     <div className="datePicker">
     <Form.Group className="mb-3" controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date"   ref={startDate} onChange={(e)=>DateHandler(e)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="EndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" ref={endDate} onChange={(e)=>DateHandler(e)}  />
      </Form.Group>
     </div>

      </Row>
      <legend />

      <Row hidden={!filter} id="filter-container"></Row>
      <legend />
      <BootstrapTable
        keyField="id"
        columns={columns}
        data={data}
        rowEvents={rowEvents}
        rowStyle={rowStyle}
        pagination={pagination}
        filter={filterFactory()}
      />
      <Menu id="context-menu">
        {activeRow && (
          <>
            <div className="text-center">{activeRow.name}</div>
            <Separator />
            {["Google", "Apple"].includes(activeRow.company) && (
              <Submenu label="Contact" arrow=">">
                <Item>Phone</Item>
                <Item>Email</Item>
              </Submenu>
            )}
            <Item disabled={activeRow.isInStock !== "yes"}>Add to Cart</Item>
          </>
        )}
      </Menu>
    </div>
  );
}

const renderPageList = (options) => (
  <Col className="react-bootstrap-table-pagination-list" md={6} >
    <ul className="pagination react-bootstrap-table-page-btns-ul float-end">
      {options.pages.map((page) => (
        <li
          key={page.page}
          className={`${page.active ? "active " : ""}page-item`}
          onClick={(e) => {
            e.preventDefault()
            options.onPageChange(page.page)}
          }
        >
          <a href="#" className="page-link">
            {page.page}
          </a>
        </li>
      ))}
    </ul>
  </Col>
);

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    color: "#0d6efd",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#0d6efd",
    color: "white",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "white",
    "&:hover": {
      color: "#bbbbbb",
    },
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
  }),
};



