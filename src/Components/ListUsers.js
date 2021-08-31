import React, { useState, useEffect, forwardRef } from "react";
import Edit from "@material-ui/icons/Edit";
import MUIDataTable from "mui-datatables";
import Delete from "@material-ui/icons/Delete";
import AppBar from "./AppBar";

const ListUsers = () => {
  const url = "users/all";

  const [data, setData] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const items = await response.json();
    setData(items);
  };

  useEffect(() => {
    getUsers();
  }, [url]);
  /*
  const data = [
    {
      user_id: "1",
      username: "Hola",
      password: "pass1",
      admin: "true",
      active: "false",
    },

    {
      user_id: "2",
      username: "Hola2",
      password: "pass2",
      admin: "false",
      active: "false",
    },
    {
      user_id: "3",
      username: "Hola",
      password: "pass3",
      admin: "false",
      active: "false",
    },
  ];
*/
  const columns = [
    {
      name: "id_user",
      label: "ID",
      options: {
        filter: true,
      },
    },
    {
      label: "USER",
      name: "username",
      options: {
        filter: true,
      },
    },
    {
      label: "PASSWORD",
      name: "password",
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
      name: "Remove",
      options: {
        tooltip: "Remove",
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Delete
              onClick={() =>
                window.alert(`Clicked "Delete" for row ${tableMeta.rowIndex}`)
              }
            ></Delete>
          );
        },
      },
    },
    {
      name: "Edit",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Edit
              onClick={() =>
                window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)
              }
            ></Edit>
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

export default ListUsers;
