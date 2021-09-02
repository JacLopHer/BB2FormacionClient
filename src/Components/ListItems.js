import React, { useState, useEffect } from "react";

import MUIDataTable from "mui-datatables";
import AppBar from "./AppBar";
import { Button } from "reactstrap";

import { Link } from "react-router-dom";

const ListItems = () => {
  const url = "store/items";

  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(url);
    const items = await response.json();
    setData(items);
  };

  useEffect(() => {
    getData();
  }, [url]);

  const columns = [
    {
      name: "id_item",
      label: "ID",
      options: {
        filter: true,
      },
    },
    {
      label: "Item Code",
      name: "description",
      options: {
        filter: true,
      },
    },
    {
      label: "Description",
      name: "description",
      options: {
        filter: true,
      },
    },
    {
      label: "Price",
      name: "price",
      options: {
        filter: true,
      },
    },
    {
      label: "Creator",
      name: "creator",
      options: {
        filter: true,
      },
    },
    {
      label: "Creation",
      name: "creation",
      options: {
        filter: true,
      },
    },
    {
      label: "State",
      name: "state",
      options: {
        filter: true,
      },
    },

    {
      name: "",
      options: {
        tooltip: "Remove",
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta.rowData);
          return (
            <Button
              disabled={tableMeta.rowData[6] !== "ACTIVE"}
              size="medium"
              color="danger"
              onClick={async () => {
                await fetch(
                  `http://localhost:8080/store/item/crud/discontinue/${tableMeta.rowData[0]}`,
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  }
                ).then(() => {
                  getData();
                  setData(data);
                });
              }}
            >
              Discontinue
            </Button>
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              size="large"
              color="primary"
              tag={Link}
              to={`items/details/${tableMeta.rowData[0]}`}
              disabled={tableMeta.rowData[6] !== "ACTIVE"}
            >
              Edit
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",

    rowsPerPage: 30,
    rowsPerPageOptions: [30, 50, 100],
  };

  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>Items</h1>
      <div className="container">
        <Button color="primary" size="large" tag={Link} to={"items/newItem"}>
          Add New Item
        </Button>
      </div>
      <MUIDataTable
        title={"Employee List"}
        columns={columns}
        data={data}
        options={options}
      />
    </>
  );
};

export default ListItems;
