import React from "react";
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';
import axios from 'axios';
import _ from 'lodash'
import logo from './avatar5.png'
import botlogo from './avatar2.png'
class BotLog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            detail: false,
            chatdis: []
        };
        this.fetchData = this.fetchData.bind(this);
        this.deletehistory = this.deletehistory.bind(this);
        this.viewdetails = this.viewdetails.bind(this);
        this.backpage = this.backpage.bind(this);
        this.apidemo = this.apidemo.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        //this.apidemo();
    }

    apidemo() {

        var url = "http://localhost:3003/api/v1/bots/{botId}/converse/{userId}";
        axios.post(url)
            .then(res => {
                alert(JSON.stringify(res));
                // this.setState({
                //     data:res.data
                // })               
            });
    }

    fetchData() {

        var url = "/GetHistoryBo";
        axios.post(url)
            .then(res => {

                this.setState({
                    data: res.data
                })

            });
    }
    deletehistory(id) {

        var url = '/DeleteHistoryData';
        axios.post(url, { conid: id }).then((response) => {

            this.fetchData();
        });

    }
    viewdetails(id) {

        var url = '/ViewHistoryData';
        axios.post(url, { conid: id }).then((res) => {

            const data = res.data;
            var ob = [];
            var chat = [];

            for (var key in data) {
                // var obj = JSON.parse(data[key]['payload']);                        
                var obj = data[key]['payload'];
                if (obj.markdown === true) {
                    chat.push({ "Bot": obj.text, botstatus: true });
                    // return obj.text;
                }
                else if (obj.wrapped !== undefined) {
                    ob.push(obj.wrapped);
                    _.mapKeys(ob, function (value, key) {
                        chat.push({ "Bot": value.text, botstatus: true });
                        // alert(JSON.stringify(value.text));           
                    });
                    ob.pop(ob);
                }
                else {
                    chat.push({ "User": obj.text, userstatus: true });
                    // return obj.text;
                }
                // console.log(obj.text)                                                                
            }

            this.setState({
                detail: true,
                chatdis: chat
            })
        });

    }
    backpage() {
        this.fetchData();
        this.setState({
            detail: false
        })
    }

    // fexport(e){
    //     var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.data));
    //     // what to return in order to show download window?
    //     var preview = document.getElementById("exportJSON");
    //     preview.setAttribute("href", "data:"+data);
    //     preview.setAttribute("download", "data.json");    
    // }

    render() {
        const { chatdis } = this.state;
        // alert(JSON.stringify(chatdis));    
        if (this.state.detail === false) {
            const columns = [
                {
                    minWidth: 150,
                    width: 150,
                    Header: 'Conversation Id',
                    accessor: 'id',
                    filterable: false
                },
                {
                    minWidth: 150,
                    width: 150,
                    Header: 'Bot Id',
                    accessor: 'botId',
                    filterable: false
                },
                {
                    minWidth: 250,
                    width: 250,
                    Header: 'userId',
                    accessor: 'userId',
                    filterable: false
                },
                {
                    minWidth: 350,
                    width: 350,
                    Header: 'Title',
                    accessor: 'title',
                    filterable: false
                },

                {
                    minWidth: 200,
                    width: 200,
                    Header: 'Create Date',
                    accessor: 'created_on',
                    filterable: false
                },

                {
                    minWidth: 250,
                    width: 250,
                    Header: 'Action',
                    filterable: false,
                    Cell: row => (

                        <div>
                            <tr>
                                <button type="button" className="btn btn-sm btn-danger" style={{ marginLeft: '5px' }} onClick={() => { this.deletehistory(row.original.id) }}><i class="fa fa-trash" id="icon"></i> Delete</button>
                                <button type="button" className="btn btn-sm btn-success" style={{ marginLeft: '5px' }} onClick={() => { this.viewdetails(row.original.id) }}><i class="fa fa-eye" id="icon"></i> View</button>
                            </tr>
                        </div>

                    )
                }
            ]

            return (
                <div>
                    <nav aria-label="breadcrumb" class="navbar navbar-dark bg-primary">
                        <div style={{ color: 'white' }}><Link style={{ color: 'white' }} to={{ pathname: '/' }}>Home</Link> / <span> History</span>
                        </div>
                    </nav>
                    {/*<div style={{marginTop:'1%'}}>
                     <a className="btn btn-sm btn-warning" id="exportJSON" onClick={() => { this.fexport(this) }} style={{ width: '80px', marginTop: '0%',marginBottom: '1%',color:'white' }} ><i class="fa fa-file-excel" id="icon"></i> Export</a>
            </div>*/}
                    <ReactTable
                        showPagination={true}
                        noDataText="Oh Noes!"
                        data={this.state.data}
                        columns={columns}
                        className="-striped -highlight"
                        defaultPageSize={10}
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
        else {
            return (
                <section class="col-lg-12 connectedSortable ui-sortable">
                    <div class="card">
                        <div class="card-body">
                            <div style={{ marginTop: '1%' }}>
                                <a className="btn btn-sm btn-dark" id="exportJSON" onClick={() => { this.backpage() }} style={{ marginLeft: '84%', width: '80px', marginTop: '0%', marginBottom: '1%', color: 'white' }} ><i class="fa fa-arrow-left" id="icon"></i> Back</a>
                            </div>

                            <div class="container">
                                <div class="messaging">
                                    <div class="inbox_msg">
                                        <div class="mesgs">
                                            <div class="msg_history">
                                                <React.Fragment>
                                                    {
                                                        <div>
                                                            {(() => {
                                                                if (chatdis.length > 0) {
                                                                    return (
                                                                        chatdis.map(chat => (
                                                                            <div style={{ marginTop: '5px' }}>
                                                                                {(() => {
                                                                                    if (chat.userstatus === true) {
                                                                                        return (
                                                                                            <div class="incoming_msg">
                                                                                                <div class="incoming_msg_img"> <img src={logo} alt="img" style={{ borderRadius: '50%' }} /> </div>
                                                                                                <div class="received_msg">
                                                                                                    <div class="received_withd_msg">
                                                                                                        <p style={{ fontSize: 'large' }}>{chat.User}</p>
                                                                                                        {/* <span class="time_date"> 11:01 AM    |    June 9</span> */}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                    if (chat.botstatus === true) {
                                                                                        return (
                                                                                            <div class="outgoing_msg">
                                                                                                <div class="botlogo"> <img src={botlogo} alt="img" style={{ borderRadius: '50%' }} /> </div>
                                                                                                <div class="sent_msg">
                                                                                                    <p style={{ fontSize: 'large' }}>{chat.Bot}</p>
                                                                                                    {/* <span class="time_date"> 11:01 AM    |    June 9</span> */}
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })()}
                                                                            </div>
                                                                        ))
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <p className="notfound">Record Not Found</p>
                                                                    )
                                                                }
                                                            })()}
                                                        </div>

                                                    }
                                                </React.Fragment>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            );

        }

    }
}



export default BotLog