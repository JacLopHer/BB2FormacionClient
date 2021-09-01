import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Input } from "reactstrap";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
export const TableHeader = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <thead>
        <tr>
          <th>#</th>
          <th>
            Code Product <Input />
          </th>
          <th>
            Description <Input />
          </th>
          <th>
            Creator <Input />
          </th>
          <th>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="outlined"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </th>
          <th>
            State <Input />
          </th>
          <th>
            Price <Input />
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
