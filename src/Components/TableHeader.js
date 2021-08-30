import React from "react";
import { Input } from "reactstrap";
export const TableHeader = () => {
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
            Creation <Input />
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
