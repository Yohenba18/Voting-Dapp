import React, { useState } from "react";
import "./Table.css";
import MaterialTable from "material-table";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

export default function DataGridDemo() {
  // const [select, setSelect] = useState(false);
  // var icons;
  // select == false ? (icons = Clear) : (icons = Check);

  return (
    <div className="table_style">
      <MaterialTable
        columns={[
          { title: "SNo.", field: "SNo" },
          { title: "Name", field: "name" },
          { title: "Votes", field: "vote" },
          // {
          //   cellStyle: {
          //     height: 50.5
          //   },
          // },
        ]}
        data={[
          { SNo: "1", name: "Baran", vote: "10" },
          { SNo: "2", name: "Baran", vote: "10" },
          { SNo: "3", name: "Baran", vote: "10" },
        ]}
        title="Candidate"
        options={{
          search: false,
          paging: false,
          // selection: true,
          rowStyle: {height: 39.5},
        }}
        localization={{
          header: {
            actions: "Choose",
          },
        }}
        // onRowClick={(() =>  setSelect(!select))}
        // actions={[
        //   {
        //     icon: icons,
        //     //icons: {tableIcons},
        //     onClick: (event, rowData) => {
        //       // setSelect(!select);
        //     },
        //   },
        // ]}
      />
    </div>
  );
}
