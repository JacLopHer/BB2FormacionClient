import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "./AppBar";
import "./../Styles/ItemDetails.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormControl, Grid } from "@material-ui/core";

const NewItem = () => {
  const [item, setItem] = useState({});
  const defaultSupplier = {
    name: "",
    country: "",
  };
  const [supplier, setSupplier] = useState(defaultSupplier);

  const defaultPriceReduction = {
    reduced_price: 0,
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: format(new Date(), "yyyy-MM-dd"),
  };
  const [priceReduction, setPriceReduction] = useState(defaultPriceReduction);
  const defaultValues = {
    code_product: "",
    description: "",
    creator: "",
    creation: format(new Date(), "yyyy-MM-dd"),
    state: "ACTIVE",
    price: "",
    priceReductions: [],
    suppliers: [],
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const [itemState, setItemState] = React.useState({ checked: true });
  const handleDateChange = (date) => {
    setFormValues({
      ...formValues,
      creation: format(date, "yyyy-MM-dd"),
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formValues));
    setItem({ ...formValues });

    await fetch("http://localhost:8080/store/item/crud/create", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    alert("Item added");
    setFormValues(defaultValues);
  };

  const handleChange = (event) => {
    setItemState({ ...itemState, [event.target.name]: event.target.checked });
    setFormValues.state = itemState;
  };

  const addSupplier = () => {
    formValues.suppliers.push(supplier);
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceReduction({ ...priceReduction, [name]: value });
  };

  const addPriceReduction = () => {
    if (!isNaN(priceReduction.reduced_price)) {
      if (
        priceReduction.reduced_price <= 100 &&
        priceReduction.reduced_price > 0
      ) {
        formValues.priceReductions.push(priceReduction);
      }
    } else {
      alert("Not a number in price reduction");
    }
  };

  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>New Item</h1>
      <FormControl variant="outlined"></FormControl>
      <form>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid
            item
            justifyContent="space-between"
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
                  id="code_product-input"
                  name="code_product"
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
            <FormControl variant="outlined">
              <Grid item className="formItem" sm={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={itemState.checked}
                      onChange={handleChange}
                      name="checked"
                      color="primary"
                      disabled
                    />
                  }
                  label="State"
                />
              </Grid>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            sm={8}
            justifyContent="space-between"
            alignItems="center"
            directions="column"
          >
            <FormControl variant="outlined">
              <Grid item className="formItem" sm={12} spacing={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  flow-direction="row"
                  wrap="nowrap"
                >
                  <FormControl variant="outlined">
                    <h5>Add Supplier</h5>
                    <TextField
                      id="supplier-input"
                      label="Name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="name"
                      type="text"
                      value={supplier.name}
                      onChange={handleSupplierChange}
                    />
                    <TextField
                      id="supplier-input"
                      label="Country"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="country"
                      type="text"
                      value={supplier.country}
                      onChange={handleSupplierChange}
                    />
                    <Button variant="contained" onClick={() => addSupplier()}>
                      Add
                    </Button>
                  </FormControl>
                </Grid>
                <div className="margintop"></div>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  flow-direction="row"
                  wrap="nowrap"
                >
                  <FormControl variant="outlined">
                    <h5>Add Price Reduction</h5>
                    <TextField
                      id="supplier-input"
                      label="Reduced Price"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="reduced_price"
                      type="text"
                      value={priceReduction.name}
                      onChange={handlePriceChange}
                    />

                    <Button
                      variant="contained"
                      onClick={() => addPriceReduction()}
                    >
                      Add
                    </Button>
                  </FormControl>
                </Grid>
                <ol justifyContent="space-between">
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
                <Grid
                  item
                  className="formItem"
                  sm={12}
                  justifyContent="space-between"
                >
                  <ol>
                    <h4>Price reductions</h4>
                    {formValues.priceReductions.map((priceReduction) => {
                      return (
                        <>
                          <li>{priceReduction.reduced_price} %</li>
                        </>
                      );
                    })}
                  </ol>
                </Grid>
              </FormControl>
              <FormControl variant="outlined">
                <Grid
                  item
                  className="formItem"
                  sm={1}
                  justifyContent="space-between"
                >
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
                <Grid item className="formItem" sm={3}>
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
              </FormControl>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            sm={1}
            justifyContent="space-between"
            alignItems="center"
            directions="column"
          ></Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewItem;
