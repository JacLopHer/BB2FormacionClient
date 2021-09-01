import React, { useState, useEffect } from "react";
import Edit from "@material-ui/icons/Edit";
import MUIDataTable from "mui-datatables";
import Delete from "@material-ui/icons/Delete";
import AppBar from "./AppBar";
import { Button, ButtonGroup, Container, Table, Input } from "reactstrap";

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
      label: "ADMIN",
      name: "admin",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value !== false) {
            return <p>True</p>;
          } else {
            return <p>False</p>;
          }
        },
      },
    },
    {
      label: "STATE",
      name: "active",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value !== false) {
            return <p>True</p>;
          } else {
            return <p>False</p>;
          }
        },
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
          return (
            <Button
              size="sm"
              color="danger"
              onClick={async () => {
                await fetch(
                  `http://localhost:8080/store/item/crud/discontinue/${
                    tableMeta.rowIndex + 1
                  }`,
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  }
                ).then(() => {
                  console.log("discotinued");
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
              size="sm"
              color="primary"
              tag={Link}
              to={`items/details/${tableMeta.rowIndex + 1}`}
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
  };

  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>Users</h1>
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
