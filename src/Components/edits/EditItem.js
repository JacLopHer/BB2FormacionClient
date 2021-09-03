import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "../AppBar";
import "../../Styles/ItemDetails.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormControl, Grid } from "@material-ui/core";

function EditItem(props) {
  const id = props.match.params.id;
  const fetchURL = "http://localhost:8080/store/item/" + id;

  const handleDateChange = (date) => {
    setFormValues({
      ...formValues,
      creation: format(date, "yyyy-MM-dd"),
    });
  };
  const [item, setItem] = useState();

  const defaultValues = {
    itemcode: "",
    description: "",
    creator: "",
    creation: "",
    state: "",
    price: "",
    priceReductions: [],
    suppliers: [],
  };
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const getItem = async () => {
    const response = await fetch(fetchURL, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    const element = await response.json();

    setFormValues({
      ...element,
    });
    formValues.suppliers = element.suppliers;
    formValues.priceReductions = element.priceReductions;
    console.log(formValues.priceReductions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setItem({ ...formValues });
    await fetch(
      "http://localhost:8080/store/item/crud/update/" + formValues.id_item,
      {
        method: formValues.id_item ? "PUT" : "POST",
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    alert("Item updated");
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>Item detail</h1>
      <FormControl variant="outlined">
        <Grid item className="formItem" sm={0}>
          {() => {
            const currentState = formValues.state;
            const color = currentState === "ACTIVE" ? "red" : "green";
            return (
              <FormControl variant="outlined">
                <Grid item className="formItem" sm={0}>
                  <h3>{formValues.state}</h3>
                </Grid>
              </FormControl>
            );
          }}
          <h3>{formValues.state}</h3>
        </Grid>
      </FormControl>
      <form>
        <Grid container justify="space-between" alignItems="center">
          <Grid
            item
            justify="space-between"
            alignItems="center"
            direction="column"
          >
            <Grid item className="formItem" sm={12}>
              <FormControl variant="outlined">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Code"
                  color="primary"
                  id="itemcode-input"
                  name="itemcode"
                  type="text"
                  value={formValues.code_product}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item className="formItem" sm={12}>
              <FormControl variant="outlined">
                <TextField
                  label="Description"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="description-input"
                  name="description"
                  type="text"
                  value={formValues.description}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item className="formItem" sm={12}>
              <FormControl variant="outlined">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Price"
                  id="price-input"
                  name="price"
                  type="text"
                  value={formValues.price}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item className="formItem" sm={12}>
              <FormControl variant="outlined">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    className="datepicker"
                    margin="normal"
                    id="creation"
                    label="Creation"
                    value={formValues.creation}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
            <Grid item className="formItem" sm={12}>
              <FormControl variant="outlined">
                <TextField
                  id="creator-input"
                  label="Creator"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="creator"
                  type="text"
                  value={formValues.creator}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item className="formItem" sm={12}>
              <Button
                className="formItem"
                size="large"
                variant="contained"
                color="primary"
                style={{ marginRight: "2rem" }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
            <Grid item className="formItem" sm={1}>
              <Button
                className="formItem"
                size="large"
                variant="contained"
                color="secondary"
                component={Link}
                to="/items"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            container
            sm={10}
            justify="space-between"
            alignItems="center"
            directions="column"
          >
            <FormControl variant="outlined">
              <Grid item className="formItem" sm={12}>
                <ol>
                  <h4>Suppliers</h4>
                  {formValues.suppliers.map((supplier) => {
                    return (
                      <>
                        <li>
                          {supplier.name} | {supplier.country}
                        </li>
                      </>
                    );
                  })}
                </ol>
              </Grid>
              <FormControl variant="outlined">
                <Grid item className="formItem" sm={12}>
                  <ol>
                    <h4>Price reductions</h4>
                    {formValues.priceReductions.map((priceReduction) => {
                      console.log(priceReduction);
                      return (
                        <>
                          <li>{priceReduction.reduced_price} %</li>
                        </>
                      );
                    })}
                  </ol>
                </Grid>
              </FormControl>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            sm={1}
            justify="space-between"
            alignItems="center"
            directions="column"
          ></Grid>
        </Grid>
      </form>
    </>
  );
}

export default EditItem;
