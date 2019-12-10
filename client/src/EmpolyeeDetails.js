import React from "react";
import ReactTable from "react-table";
//import './custom.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import '../Bootstrap/css/react-table.css';
import  'react-table/react-table.css';
import axios from 'axios';


class EmployeeDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            modalt: false,
            modal: false,
           
        };
        this.fetchData = this.fetchData.bind(this);
        this.logChange = this.logChange.bind(this);
        this.toggleadd = this.toggleadd.bind(this);
       // this.addpolicy = this.addpolicy.bind(this);
        this.togglepopup = this.togglepopup.bind(this);
        this.closepopup = this.closepopup.bind(this);
      //  this.afterSaveCell = this.afterSaveCell.bind(this);
        this.isactive = this.isactive.bind(this);
       
    }

    componentDidMount() {
       // this.fetchData();
      
    }
  
    fetchData() {
        
        var url = "http://localhost:3000/GetPolicyBo";
        axios.post(url)
            .then(res => {
                //alert(JSON.stringify(res.data));
                if (res.data.length > 0) {
                    this.setState({
                        data:res.data
                    })
                }
                else {
                    this.setState({
                        data:res.data
                    })
                }
            });
    }

    toggleadd() {

        this.setState({
            modalt: !this.state.modalt
        })
    }
   
    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }
      
    togglepopup(row) {
        //alert(JSON.stringify(row));
        if (row.polId === undefined) {
           
            this.setState({
                modal: this.state.modal
            })
        } else {
           
            this.setState({
                modal: !this.state.modal,
                polId: row.polId,
                polName: row.polName,
                polStatus: row.polStatus,
                pDesc: row.polDescription
                
            })
        }
        
    }

    closepopup() {
        this.setState({
            modal: !this.state.modal
        })
    }
  
    isactive(isact, id) {
        var tblname = "Policy";
        var kid = "polId";
        var kactive = "polStatus";
        var isactive = "";
        if (isact === '1') {
            isactive = '0';
        } else {
            isactive = '1';
        }
        var url = 'http://localhost:3000/IsActive';
        axios.post(url, {id, isactive,tblname,kid,kactive}).then((response) => {
            this.fetchData();
        });
       
    }

    render() {
      
        
        const columns = [

            {
                minWidth:300,
                width: 300,
                Header: 'Policy',
                accessor: 'label',
                filterable: true
            },
            {
                minWidth: 300,
                width: 300,
                Header: 'Status',
                accessor: 'polStatus',
                filterable: false,
                Cell: (row) => {
                    if (row.original.polStatus === "1") {
                        return <div style={{ textAlign: 'center' }}>
                            <button type="button" className='btn btn-sm btn-primary' style={{ marginLeft: '5px' }} onClick={() => { this.isactive(row.original.polStatus, row.original.polId); }}><i class="fa fa-check" id="icon"></i> Active</button>
                        </div>
                    } else {

                        return <div style={{ textAlign: 'center' }}>
                            <button type="button" className='btn btn-sm btn-danger' style={{ marginLeft: '5px' }} onClick={() => { this.isactive(row.original.polStatus, row.original.polId); }}><i class="fa fa-exclamation" id="icon"></i> InActive</button>
                        </div>
                    }

                }
            },       
            {
                minWidth: 300,
                width: 300,
                Header: 'Action',
                filterable: false,
                Cell: row => (

                    <div>
                        <tr>
                            <td>
                                <button type="button" className="btn btn-sm btn-success" style={{ marginLeft: '90px' }} onClick={() => { this.togglepopup(row.original); }}><i class="fa fa-edit" id="icon"></i> Edit</button>
                                <button type="button" className="btn btn-sm btn-danger" style={{ marginLeft: '5px' }} onClick={()=>{this.deletepolicy(row.original.polId)}}><i class="fa fa-trash" id="icon"></i> Delete</button>
                            </td>

                        </tr>
                    </div>

                )
            }
        ]

        return (

            <div>

                <ReactTable
                    //  manual 
                    noDataText="Oh Noes!"
                    data={this.state.data}
                    columns={columns}
                    className="-striped -highlight"
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 25, 50]}
                    filterable
                    getTdProps={() => ({
                        style: {
                            textAlign: 'center'
                        }
                    })}
                //pages={this.state.TotalPage}
                //onFetchData={this.onPageChange}

                />
            </div >
        );
    }

}



export default EmployeeDetails