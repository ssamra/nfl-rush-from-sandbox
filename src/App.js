import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";

import rushData from "./nflRush.json";
import React from "react";

class NflRush extends React.Component {
  constructor(props) {
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
  }
  handleDownload() {
    this.state.gridApi.exportDataAsCsv();
  }
  onGridReady = (params) => {
    this.setState({
      gridApi: params.api,
      columnApi: params.columnApi
    });
    this.state.gridApi.sizeColumnsToFit();
  };
  gridOptions = {
    columnDefs: [
      { field: "Player", filter: true },
      { field: "Team" },
      { field: "Pos" },
      { field: "Att" },
      { field: "Att/G" },
      { field: "Avg" },
      { field: "Yds", sortable: true },
      { field: "Yds/G" },
      { field: "TD", sortable: true },
      { field: "Lng", sortable: true },
      { field: "1st" },
      { field: "1st%" },
      { field: "20+" },
      { field: "40+" },
      { field: "FUM" }
    ],
    rowData: rushData,
    pagination: true,
    onGridReady: this.onGridReady,
    defaultColDef: {
      resizable: true
    }
  };

  render() {
    return (
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: window.innerHeight }}
      >
        <br />
        <button
          className="ag-theme-alpine-button"
          onClick={this.handleDownload}
        >
          Download2 Grid As CSV
        </button>

        <AgGridReact gridOptions={this.gridOptions}></AgGridReact>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.state.gridApi.sizeColumnsToFit();
  };
}

export default NflRush;
