import React from "react";
import ReactTable from "react-table";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import '../Bootstrap/css/react-table.css';
import  'react-table/react-table.css';
import axios from 'axios';
import $ from 'jquery';
import CKEditor from "react-ckeditor-component";
import { Link } from 'react-router-dom';


class Policy extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            modalt: false,
            modal: false,
            polId: '',
            polName: '',
            polStatus: '',
            pDesc:'',
            pDes:'',
            selectedFile: '',
            imagePreviewUrl: '',
        };
        this.fetchData = this.fetchData.bind(this);
        this.logChange = this.logChange.bind(this);
        this.toggleadd = this.toggleadd.bind(this);
        this.addpolicy = this.addpolicy.bind(this);
        this.togglepopup = this.togglepopup.bind(this);
        this.closepopup = this.closepopup.bind(this);
        this.afterSaveCell = this.afterSaveCell.bind(this);
        this.isactive = this.isactive.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onChangeEdit=this.onChangeEdit.bind(this);
        this.deletepolicy=this.deletepolicy.bind(this);
        this.fexport=this.fexport.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
      
    }
  
    fetchData() {
        
        var url = "http://localhost:3000/GetPolicyBo";
        axios.post(url)
            .then(res => {
               // alert(JSON.stringify(res.data));
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
    
    onChangeEdit(evt) {
       
        // console.log("onChange fired with event info: ", evt);
         var newContent = evt.editor.getData();
         this.setState({
             pDesc: newContent
         })
     }

    onChange(evt) {
       
       // console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            pDes: newContent
        })
    }
   
    addpolicy(e) {
        e.preventDefault();
        var pname = $('#name').val();
        var pDesc = this.state.pDes;
        var status = this.status.value;

        // var form = $('#FormUpload')[0];
        // var fileData = new FormData(form);

        const data = new FormData();
        data.append('file', this.state.selectedFile);
        data.append('polName', pname);
        data.append('polDescription', pDesc);
        data.append('polStatus', status);

        // data.forEach(function (value, key) {
        //     console.log(key, value);
        //   });

        var url = "http://localhost:3000/AddPolicyBo";       

        axios.post(url,data)
        
            .then((result) => {
                this.setState({                  
                    modalt: !this.state.modalt,
                    pDes:''
                })
                this.fetchData();
            });
            // $.ajax({
            //     type: "POST",
            //     url: url,
            //     data: data,
            //     processData: false,
            //     contentType: false,
            //     success: function(response) {
            //         console.log(response);
            //     },
            //     error: function(errResponse) {
            //         console.log(errResponse);
            //     }
            // });
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

    async afterSaveCell(e) {

        e.preventDefault();
        let data = [];
        var status = $('#polStatus').val();
        var polId = $('#polId').val();
        var polName = $('#polName').val();
        var pDesc = this.state.pDesc


        data.push({ "polId": polId }, { "polStatus": status }, { "polName": polName }, { "polDescription": pDesc });

        var url = 'http://localhost:3000/EditPolicyData';
        await axios.post(url, data).then((response) => {
            //alert("Successfully Updated Data");
            this.setState({
                modal: !this.state.modal
            });
            this.fetchData();
        });
    }

deletepolicy(id){

    var url = 'http://localhost:3000/DeletePolicyData';
     axios.post(url, {pid:id}).then((response) => {
    
        this.fetchData();
    });

}

handleImageChange(e) {
    e.preventDefault();

    const file = e.target.files[0];
    this.setState({
                selectedFile: file
            });
    
}

fexport(e){
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.data));
    // what to return in order to show download window?
    var preview = document.getElementById("exportJSON");
    preview.setAttribute("href", "data:"+data);
    preview.setAttribute("download", "data.json");    
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
      
         const mt = {
            'margin-top': 20
        };

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

                <Modal isOpen={this.state.modal} toggle={this.togglepopup} className="producttableadd">
                    <ModalHeader toggle={this.closepopup}>Edit Policy</ModalHeader>
                    <ModalBody>
                        <form id="formid" enctype="multipart/form-data" onSubmit={this.afterSaveCell}>

                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    
                                </div>
                                <div className="col-sm-6">
                                    <input type="hidden" onChange={this.logChange} required className="form-control" name="polId" id="polId" value={this.state.polId} />
                                </div>
                                <div className="col-sm-4">

                                </div>
                            </div>

                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label for="sel1">Policy Name</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" onChange={this.logChange} required className="form-control" name="polName" id="polName" value={this.state.polName} />
                                </div>
                                
                            </div>

                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label for="sel1">Description</label>
                                </div>
                                <div className="col-sm-10">
                                                       <CKEditor
                                                            activeClass="p5"
                                                            content={this.state.pDesc}

                                                            events={{
                                                                //"blur": this.onBlur,
                                                                //"afterPaste": this.afterPaste,
                                                                "change": this.onChangeEdit
                                                            }}

                                                        />
                                </div>
                            </div>

                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label for="sel1">Status</label>
                                </div>
                                <div className="col-sm-10">
                                    <select className="form-control" id="polStatus" ref={(input) => this.status = input} value={this.state.polStatus} name='polStatus' onChange={this.logChange} required>
                                        <option value=''>Select Status</option>
                                        <option value='0'>In Active</option>
                                        <option value='1'>Active</option>
                                    </select>
                                </div>
                               
                            </div>

                            <div className="row" style={mt}>
                                <div className="col-sm-8">
                                   
                                </div>
                                <div className="col-sm-">
                                    <input type="submit" value="Save" className="btn btn-primary validate" id="btnsubmit" />
                                    <a className="btn btn-red" href="javascript:void(0)" onClick={this.closepopup}>Cancel</a>
                                </div>
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>


                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalt} toggle={this.toggleadd} className="producttableadd">
                    <ModalHeader toggle={this.toggleadd}>Add Policy</ModalHeader>
                    <ModalBody>
                        <form id="FormUpload" enctype="multipart/form-data" method="post"  onSubmit={this.addpolicy} >

                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label for="sel1">Policy Name</label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" onChange={this.logChange} required className="form-control" name="name" id="name" />
                                </div>
                                
                            </div>

                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label for="sel1">Description</label>
                                </div>
                                <div className="col-sm-10">
                                                       <CKEditor
                                                            activeClass="p5"
                                                            content={this.state.pDes}

                                                            events={{
                                                                //"blur": this.onBlur,
                                                                //"afterPaste": this.afterPaste,
                                                                "change": this.onChange
                                                            }}

                                                        />
                                </div>

                            </div>


                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label for="sel1">File</label>
                                </div>
                                <div className="col-sm-10">
                                    <input className="fileInput form-control" 
                                        type="file"
                                        onChange={this.handleImageChange}
                                        name="avtar"
                                        accept=""
                                        />
                                    
                                </div>                                

                            </div>

                            <div className="row" style={mt}>
                                <div className="col-sm-2">
                                    <label for="sel1">Status</label>
                                </div>
                                <div className="col-sm-10">
                                    <select className="form-control" id="status" ref={(input) => this.status = input} name='status'  required>
                                        <option value=''>Select Status</option>
                                        <option value='0'>In Active</option>
                                        <option value='1'>Active</option>
                                    </select>
                                </div>
                                
                            </div>

                            <div className="row" style={mt}>
                                <div className="col-sm-8">
                                   
                                </div>
                                <div className="col-sm-4">
                                    <input type="submit" value="Save" className="btn btn-primary validate" id="btnsubmit" />
                                    <a className="btn btn-red" href="javascript:void(0)" onClick={this.toggleadd}>Cancel</a>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
                
                
               <nav aria-label="breadcrumb" class="navbar navbar-dark bg-primary">
                                <div style={{color:'white'}}><Link style={{color:'white'}} to={{ pathname: '/' }}>Home</Link> / <span>Policy</span>
                                </div>
                                                              
               </nav>
               <div style={{marginTop:'1%'}}>

                  <Button className="btn btn-sm btn-info" onClick={() => { this.toggleadd() }} style={{ width: '80px', marginBottom: '1%' }}><i class="fa fa-plus" id="icon"></i> Add</Button>                
                  <a className="btn btn-sm btn-warning" id="exportJSON" onClick={() => { this.fexport(this) }} style={{ width: '80px', marginBottom: '1%',marginLeft:'1%',color:'white'}}><i class="fa fa-file-excel" id="icon"></i> Export</a>
              
               </div>
                <ReactTable
                    //  manual 
                    showPagination={false}
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



export default Policy