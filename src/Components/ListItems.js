import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Table, Input } from "reactstrap";
import TableHeader from "./TableHeader";
import AppBar from "./AppBar";
import { Link } from "react-router-dom";
const url = "store/items";

const ListItems = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await fetch(url);
    const items = await response.json();
    setItems(items);
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>Items</h1>

      <Table hover responsive="sm">
        <TableHeader />
        <tbody>
          {items.map((item) => {
            const {
              state,
              code_product,
              description,
              price,
              creator,
              creation,
              item_id,
            } = item;

            return (
              <>
                <tr id={item_id}>
                  <th scope="row"></th>
                  <td>{code_product}</td>
                  <td>
                    <a href="#">{description}</a>
                  </td>
                  <td>{creator}</td>
                  <td>{creation}</td>
                  <td className="stateavaiable">{state}</td>
                  <td>{price} €</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="primary"
                        tag={Link}
                        to={`items/details/${item.id_item}`}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        //onClick={() => this.remove(client.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ListItems;
