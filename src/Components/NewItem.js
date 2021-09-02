import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "./AppBar";
import "./../Styles/ItemDetails.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const NewItem = () => {
  const [item, setItem] = useState({});
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

    console.log(formValues);
    await fetch("http://localhost:8080/store/item/crud/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    alert("Item updated");
  };

  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>New Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="detailsform" style={{ marginTop: "2rem" }}>
          <div className="row itemDataRow">
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
          </div>

          <div className="row itemDataRow">
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
          </div>

          <div className="row itemDataRow">
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
          </div>

          <div className="row itemDataRow">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="creation"
                label="Creation"
                value={formValues.creation}
                onChange={handleDateChange}
                disabled
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="row">
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
          </div>
          <div className="row" style={{ marginTop: "2rem" }}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              style={{ marginRight: "2rem" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              component={Link}
              to="/items"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewItem;
