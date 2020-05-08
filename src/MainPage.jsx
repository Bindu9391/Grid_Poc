import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import rawData from './rawData.json';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make",sortable: true, filter: true, checkboxSelection: true
      }, {
        headerName: "Model", field: "model",sortable: true, filter: true
      }, {
        headerName: "Price", field: "price",sortable: true, filter: true
      }],
     rowData: null,
       //rowData: [{
      //   make: "Toyota", model: "Celica", price: 35000
      // }, {
      //   make: "Ford", model: "Mondeo", price: 32000
      // }, {
      //   make: "Porsche", model: "Boxter", price: 72000
      // }]
    }
   const carDataList = rawData.carData;
  }
  
      componentDidMount() {
        const carDataList = rawData.carData;
        //fetch('./rawData.json')
        fetch(carDataList)
        //fetch("C:\Users\Sonyy\Desktop\RawData.json")
           //fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json')
         //.then(Response=>Response.json())
           .then(result => result.json())
         .then(rowData => this.setState({rowData}))
       }
        
       onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }
    

    onBtAdd =e=> {
      var selectedRows = this.gridApi.getSelectedNodes()
      var newItemCount = 0;
      if (!selectedRows || selectedRows.length === 0) {
        return;
      }
      var selectedRow = selectedRows[0];
    
      // insert new row in the source data, at the top of the page
      window.rowDataServerSide.splice(selectedRow.rowIndex, 0, {
        athlete: 'New Item' + newItemCount,
      });
      newItemCount++;
    
     // gridOptions.api.purgeServerSideCache();
    }
    

  render() {
    return (
<div style={{ height: '250px', width: '600px' }} className="ag-theme-alpine">
      <AgGridReact
      rowSelection="multiple"
        onGridReady={ params => this.gridApi = params.api }
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData}>
    </AgGridReact>

    <button onClick={this.onButtonClick}>Get selected rows</button>

    <button onClick={this.onBtAdd}>Add Row</button>
      
</div>

      // <div
      //   className="ag-theme-alpine"
      //   style={{
      //   height: '250px',
      //   width: '600px' }}
      // >
      //    <AgGridReact
      //   rowSelection ="multiple"
      //     columnDefs={this.state.columnDefs}
      //     rowData={this.state.rowData}>
      //   </AgGridReact>
      // </div>
    );
  }
}

export default MainPage;