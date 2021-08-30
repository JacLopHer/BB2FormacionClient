import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Table, Input } from "reactstrap";
import TableHeader from "./TableHeader";
import AppBar from "./AppBar";

const url = "http://localhost:8080/store/items";

const MyFirstComponent = (props) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await fetch(url);
    const items = await response.json();
    setItems(items);
    console.log(items);
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <AppBar></AppBar>
      <h5>Items</h5>

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
                  {<td className="stateavaiable">{state}</td>}
                  <td>{price} €</td>

                  <td>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        color="primary"
                        //tag={Link}
                        //to={"/clients/" + client.id}
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

export default MyFirstComponent;
