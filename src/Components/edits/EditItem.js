import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import AppBar from "../AppBar";
import "../../Styles/ItemDetails.css";
import { Link } from "react-router-dom";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

var DatePicker = require("reactstrap-date-picker");

function EditItem(props) {
  const id = props.match.params.id;
  const fetchURL = "http://localhost:8080/store/item/" + id;
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [item, setItem] = useState();

  const defaultValues = {
    itemcode: "",
    description: "",
    creator: "",
    creation: "",
    state: "",
    price: "",
    priceReductions: [{}],
    suppliers: [{}],
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
    const response = await fetch(fetchURL);
    const element = await response.json();
    setFormValues({
      ...element,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setItem({ ...formValues });
    await fetch(
      "http://localhost:8080/store/item/crud/update/" + formValues.id_item,
      {
        method: formValues.id_item ? "PUT" : "POST",
        headers: {
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
      <form onSubmit={handleSubmit}>
        <div className="detailsform" style={{ marginTop: "2rem" }}>
          <div className="row itemDataRow">
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
            <TextField
              id="creation"
              label="Creation"
              type="date"
              value={formValues.creation}
              InputLabelProps={{
                shrink: true,
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              onChange={handleInputChange}
            />
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
              value={formValues.creation}
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
}

export default EditItem;
