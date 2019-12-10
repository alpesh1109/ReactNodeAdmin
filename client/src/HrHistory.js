import React from "react";
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import  'react-table/react-table.css';
import axios from 'axios';



class HrHistory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            modalt: false,
            modal: false,
           
        };
        this.fetchData = this.fetchData.bind(this);
        this.deletehistory=this.deletehistory.bind(this);
        
       
    }

    componentDidMount() {
        this.fetchData();
      
    }
  
    fetchData() {
        
        var url = "http://localhost:3000/GetHistoryBo";
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
    deletehistory(id){

        var url = 'http://localhost:3000/DeleteHistoryData';
         axios.post(url, {hisid:id}).then((response) => {
        
            this.fetchData();
        });
    
    }
    
    fexport(e){
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.data));
        // what to return in order to show download window?
        var preview = document.getElementById("exportJSON");
        preview.setAttribute("href", "data:"+data);
        preview.setAttribute("download", "data.json");    
    }

    render() {
      
        
        const columns = [
            {
                minWidth:90,
                width: 90,
                Header: 'Name',
                accessor: 'hisempname',
                filterable: true
            },
            {
                minWidth:60,
                width: 60,
                Header: 'Code',
                accessor: 'hisempcode',
                filterable: false
            },
            // {
            //     minWidth:50,
            //     width: 50,
            //     Header: 'Pin',
            //     accessor: 'hisemppin',
            //     filterable: false
            // },
            
            {
                minWidth:110,
                width: 110,
                Header: 'Choice',
                accessor: 'hisempchoice',
                filterable: false
            },
            {
                minWidth:100,
                width: 100,
                Header: 'Policy',
                accessor: 'polName',
                filterable: false
            },
            {
                minWidth:110,
                width: 110,
                Header: 'Department',
                accessor: 'hisdepartment',
                filterable: false
            },
            {
                minWidth:110,
                width: 110,
                Header: 'Start Date',
                accessor: 'hisstartdate',
                filterable: false
            },
            {
                minWidth:110,
                width: 110,
                Header: 'End Date',
                accessor: 'hisenddate',
                filterable: false
            },
            {
                minWidth:140,
                width: 140,
                Header: 'Reason',
                accessor: 'hisreason',
                filterable: false
            },
            {
                minWidth:80,
                width: 80,
                Header: 'Feedback',
                accessor: 'hisfeedback',
                filterable: false
            },
            {
                minWidth:85,
                width: 85,
                Header: 'Action',
                filterable: false,
                Cell: row => (

                    <div>
                        <tr>
                           
                          <button type="button" className="btn btn-sm btn-danger" style={{ marginLeft: '5px' }} onClick={()=>{this.deletehistory(row.original.hisId)}}><i class="fa fa-trash" id="icon"></i> Delete</button>
                           

                        </tr>
                    </div>

                )
            }
        ]

        return (

            <div>

               <nav aria-label="breadcrumb" class="navbar navbar-dark bg-primary">
                                <div style={{color:'white'}}><Link style={{color:'white'}} to={{ pathname: '/' }}>Home</Link> / <span>Policy History</span>
                                </div>
                                                              
               </nav>
               <div style={{marginTop:'1%'}}>
                 <a className="btn btn-sm btn-warning" id="exportJSON" onClick={() => { this.fexport(this) }} style={{ width: '80px', marginTop: '0%',marginBottom: '1%',color:'white' }} ><i class="fa fa-file-excel" id="icon"></i> Export</a>
               </div>
                <ReactTable
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



export default HrHistory