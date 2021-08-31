import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import AppBar from "../AppBar";
import "../../Styles/ItemDetails.css";
import Datepicker from "./datepicker/Datepicker";

function EditItem() {
  const defaultValues = {
    itemcode: "",
    description: "",
    Creator: "",
    Creation: "",
    State: true,
    Price: 0,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>Item detail</h1>
      <form onSubmit={handleSubmit}>
        <div class="detailsform">
          <div class="row">
            <TextField
              id="itemcode-input"
              name="itemcode"
              label="Item Code"
              type="text"
              value=""
              onChange={handleInputChange}
            />
          </div>
          <div class="row">
            <TextField
              id="description-input"
              name="description"
              label="Description"
              type="text"
              value=""
              onChange={handleInputChange}
            />
          </div>
          <div class="row">
            <TextField
              id="description-input"
              name="description"
              label="Name"
              type="text"
              value=""
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <Datepicker type="Birthday"></Datepicker>
          </div>
          <div class="row">
            <TextField
              id="creator-input"
              name="creator"
              label="Creator"
              type="text"
              value=""
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default EditItem;
