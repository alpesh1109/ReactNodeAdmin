import React, { Component } from 'react';
import axios from 'axios';
import {Col, Grid, Row, Table } from 'react-bootstrap';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';

import Select from 'react-select';
import style from './style.scss';
import _ from 'lodash'

const toPercent = (decimal, fixed = 0) => {
  return `${(decimal * 100).toFixed(fixed)}%`
}
 const color = {
  facebook: '#8884d8',
  slack: '#de5454',
  kik: '#ffc658',
  male: '#8884d8',
  female: '#de5454',
  conversation: '#de5454',
  retention: '0, 177, 92', //rgb, convert in rgba in code
  busyHours: '255, 162, 22' //rgb, convert in rgba in code
}
const options=[];
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];
class botpresschart extends Component {

 constructor(props) {
    super(props)
    this.state = {
      graph:[],
      selectedOption: null,
      flagvar:true
     
    }
    this.drpsel=this.drpsel.bind(this);
    this.graphs=this.graphs.bind(this);
    this.demo=this.demo.bind(this);
  };
  
  componentDidMount() {
     //this.linechart();
      //this.graphs();
      this.demo();
      this.drpsel();
     
  }
  demo(){

    var url='';

    fetch(url, {
      method: 'POST',
      headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),     
      body: 'json=' + JSON.stringify([{      
          "userPinNo": "",
          "userMobile": "",
          "languageID": "1",
          "userDeviceID": "token",
          "apiType": "Web",
          "apiVersion": "1.0",
          "userType":"Patient"
      }])
      })
      .then((response) => response.json())
      .then((responseJson) => {
      
         alert(JSON.stringify(responseJson[0].data));
      
      })
			
  }
  drpsel(){
  
    axios.post('/drpselect').then( result => { 
         const data=result.data;
       
          if (options.length <= 0){
            for (var key in data){
              options.push({value:data[key].botId,label:data[key].botId});
              // alert(JSON.stringify(options));
            } 
          }    
       })
      
   }
  
  handleChange = selectedOption => {
   
    this.setState({selectedOption });
    this.graphs(selectedOption.value);
    //console.log(`Option selected:`, selectedOption.value);
  };
   graphs(opval){

     axios.post('/graph',{"opval":opval}).then( result => { 
          const data=result.data;
          // alert(JSON.stringify(data));
          this.setState({ 
            graph:data
          })
        })
    }
      renderDays() {
        const days = [1, 2, 3, 4, 5, 6, 7]
        return days.map(i => {
          return <td key={i}>Day {i}</td>
        })
      }
      renderRetentionHeatMapHeader() {
        return (
          <thead>
            <tr>
              <th>Date</th>
              <td>Users</td>
              {this.renderDays()}
              <td>Overall</td>
            </tr>
          </thead>
        )
      }
    
      renderRetentionData(value, i) {
        if (value === null) {
          return (
            <td key={i} className={style.noData}>
              &nbsp;
            </td>
          )
        }
    
        if (i === 0) {
          return <td key={i}>{value}</td>
        }
    
        const opacity = value * value
        const bgStyle = {
          backgroundColor: 'rgba(' + color['retention'] + ',' + opacity + ')'
        }
        return (
          <td style={bgStyle} key={i}>
            {toPercent(value)}
          </td>
        )
      }
    
      renderRetentionRow(rowValues, key) {
        const date = key
        const rowData = rowValues.map(this.renderRetentionData.bind(this))
        return (
          <tr key={date}>
            <th>{date}</th>
            {rowData}
          </tr>
        )
      }
    
      renderRetentionHeatMapBody() {
        const dataPerDate = _.mapValues(this.state.graph.retentionHeatMap, this.renderRetentionRow.bind(this))
        return <tbody key="retention">{_.values(dataPerDate)}</tbody>
      }
      
    
      renderHours() {
        const hours = []
        for (let i = 0; i < 24; i++) {
          hours.push(i)
        }
    
        return hours.map(i => {
          return <td key={i}>{i}</td>
        })
      }
    
      renderBusyHoursHeatMapHeader() {
        return (
          <thead>
            <tr>
              <th>Hours</th>
              {this.renderHours()}
            </tr>
          </thead>
        )
      }
    
      renderBusyHoursData(value, i) {
        const opacity = value
        const bgStyle = {
          backgroundColor: 'rgba(' + color['busyHours'] + ',' + opacity + ')'
        }
        return (
          <td style={bgStyle} key={i}>
            &nbsp;
          </td>
        )
      }
    
      renderBusyHoursRow(rowValues, key) {
        const date = key
        const rowData = rowValues.map(this.renderBusyHoursData.bind(this))
        return (
          <tr key={date}>
            <th>{date}</th>
            {rowData}
          </tr>
        )
      }
    
      renderBusyHoursHeatMapBody() {
        const dataPerDate = _.mapValues(this.state.graph.busyHoursHeatMap, this.renderBusyHoursRow.bind(this))
        return <tbody key="busyhours">{_.values(dataPerDate)}</tbody>
      }
    
      renderBusyHoursHeatMapChart() {
        return (
          
            <Table responsive>
              {this.renderBusyHoursHeatMapHeader()}
              {this.renderBusyHoursHeatMapBody()}
            </Table>
         
        )
      }

  render() { 
   const { selectedOption } = this.state;
   const bardata=this.state.graph.interactionsRange;
   const linedata=this.state.graph.activeUsers;
   const areadata=this.state.graph.totalUsers;
   const avgdata=this.state.graph.fictiveSpecificMetrics;


   var temp=[];
   for (var key in avgdata){
     temp.push(avgdata[key]);
    //console.log(`key: ${key}, value: ${avgdata[key]}`);
    //alert(temp[0]);
 }
   if(selectedOption === null)
   {
    return (
      <Grid fluid >
      <Row>
        <Col md={12}>
        <section class="col-lg-12 connectedSortable ui-sortable">      
           <div class="card">             
              <div class="card-body">
              <div className="row" >
                <div className="col-lg-9"></div>
                {/* <div className="col-lg-3"></div> */}
                  <div className="col-lg-3">
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={options}
                    />
                </div>
             </div>
             </div>
          </div>
        </section>
        </Col>
      </Row>   
    </Grid>       
      );
   }
   else{
    return (

  <div> 
    <Grid fluid>
      <Row>
        <Col md={12}>
        <section class="col-lg-12 connectedSortable ui-sortable">      
           <div class="card">             
              <div class="card-body">
              <div className="row" >
                <div className="col-lg-9"></div>
                {/* <div className="col-lg-3"></div> */}
                  <div className="col-lg-3">
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={options}
                    />
                </div>
             </div>
             </div>
          </div>
        </section>
        </Col>
      </Row>   
    </Grid>       
    <Grid fluid>
        <Row>
          <Col md={12}>
          <section class="col-lg-12 connectedSortable ui-sortable">      
                <div class="card">             
                   <div class="card-body">
                   <h5 style={{marginLeft:'3%'}}>Total number of users</h5>
                   <ResponsiveContainer height={300} width="100%">
                     <AreaChart  data={areadata}
                         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                         <defs>
                           <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9}/>
                             <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                           </linearGradient>
                           <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.9}/>
                             <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
                           </linearGradient>
                         </defs>
                         <XAxis dataKey="name" />
                         <YAxis />
                         <CartesianGrid strokeDasharray="3 3" />
                         <Tooltip />
                       <Area type="monotone" dataKey="web" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                       <Area type="monotone" dataKey="api" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                     </AreaChart> 
                     </ResponsiveContainer>
                  </div>
               </div>         
          </section>              
		  </Col>
    </Row>     
  </Grid>
    <Grid fluid style={{marginTop:'1%'}}>
        <Row>
          <Col md={6}>
          <section class="col-lg-12 connectedSortable ui-sortable">         
                <div class="card">             
                   <div class="card-body">
                   <h5 style={{marginLeft:'5%'}}>Active users in last 2 weeks</h5>
                   <ResponsiveContainer width="100%" height={267}>        
                     <BarChart  data={bardata}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="name" />
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Bar dataKey="count" fill="#8884d8" />      
                     </BarChart>
                     </ResponsiveContainer>  
                  </div>
               </div>           
           </section>        
		      </Col>
         
          <Col md={6}>
          <ResponsiveContainer width="100%" > 
          <section class="col-lg-12 connectedSortable ui-sortable">         
                <div class="card">           
                   <div class="card-body">
                      <h5 > Busy hours for last 7 days</h5>
                    <div style={{textAlign:'center'}}>
                      <h4 style={{marginTop:'6%'}}>Average number of interactions</h4>
      
                      <h1>{temp[0]}</h1>
      
                      <h4>Number of active users</h4>
                      <h3>
                        <small>Today :</small> {temp[1]}
                      </h3>
                      <h5>
                        <small>Yesterday :</small> {temp[2]}
                      </h5>
                      <h5>
                        <small>Week :</small> {temp[3]}
                      </h5>
                    </div>
                  </div>
               </div>         
             </section>   
            </ResponsiveContainer>
		      </Col>
             
        </Row>
        
    </Grid>                    
    <Grid fluid style={{marginTop:'1%'}}>
        <Row>
        <Col md={12}>
          <section class="col-lg-12 connectedSortable ui-sortable">          
                <div class="card">       
                   <div class="card-body">
                   <h5 style={{marginLeft:'5%'}}>Average incoming interactions (last 2 weeks)</h5>
                   <ResponsiveContainer width="100%" height={300}> 
                    <LineChart data={linedata}
                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="name" />
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Line type="monotone" dataKey="web" stroke="#3393ff" />
                         <Line type="monotone" dataKey="api" stroke="#ff6433 " />
                     </LineChart>
                     </ResponsiveContainer>  
                  </div>
               </div>
          </section>             
		      </Col>
        </Row>     
    </Grid>
    <Grid fluid style={{marginTop:'1%'}}>
        <Row>
          <Col md={12}>
          <section class="col-lg-12 connectedSortable ui-sortable">           
                <div class="card">        
                   <div class="card-body">
                   <h5>Rentention for last 7 days </h5>                     
                      
                       <Table table striped bordered hover responsive >
                         {this.renderRetentionHeatMapHeader()}
                         {this.renderRetentionHeatMapBody()}
                       </Table>                    
                    
                  </div>
               </div>        
             </section> 
		     </Col>
        </Row>      
   </Grid>
    
    <Grid fluid style={{marginTop:'1%'}}>
        <Row>
          <Col md={12}>
          <ResponsiveContainer width="100%" height={650}> 
          <section class="col-lg-12 connectedSortable ui-sortable">               
                <div class="card">
                  <div class="card-body">
                    <h5 style={{marginLeft:'1%'}}>Busy hours for last 7 days</h5>
                     <div style={{marginTop:'2%'}}>
                       {this.renderBusyHoursHeatMapChart()}
                     </div>
                  </div>
                </div>     
          </section>
          </ResponsiveContainer>
		     </Col>
        </Row>       
      </Grid>
 </div>                             
    );
  } 
  }
}

export default botpresschart; 