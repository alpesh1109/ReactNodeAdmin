var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//const sqlite3 = require('sqlite3').verbose();
// var moment = require('moment');
// var Promise = require('bluebird');
var _ = require("lodash");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const database = {
  client: "pg", // pg is the database library for postgreSQL on knexjs
  connection: {
    host: "127.0.0.1", // Your local host IP
    user: "postgres", // Your postgres user name
    password: "", // Your postrgres user password
    database: "botpress" // Your database name
  }
};
const knex = require('knex')(database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.set('view engine', 'jade');
//app.set('port', process.env.PORT || 1337);

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})


app.post('/graph', function (req, res) {
  let param = req.body;
  try {

    knex.select('value')
      .from('srv_kvs')
      .where('key', '=', 'analytics')
      .andWhere('botId', '=', param.opval)
      .then(results => {
        // console.log(results.length)
        if(results.length > 0){
          res.send(results[0].value);
        }else{
          res.send(null);
        }      
      })
  }
  catch (e) {
    res.json(e);
  }
});
app.post('/drpselect', function (req, res) {

  try {

    knex.select('botId')
      .from('srv_kvs')
      //.where('key', '=', 'analytics')
      //.andWhere('botId', '=', 'demo')
      .then(results => {
        res.send(results);
      })

  }
  catch (e) {
    res.json(e);
  }
});

app.post('/GetHistoryBo', function (req, res) {

  try {

    knex.select('web_conversations.id', 'web_conversations.userId', 'web_conversations.created_on', 'web_conversations.title', 'web_conversations.botId')
      .from('web_conversations')
      // .leftJoin('web_conversations','web_conversations.id','web_messages.conversationId')
      .then(results => {
        res.json(results);

      })

  }
  catch (e) {
    res.json(e);
  }
});

app.post('/DeleteHistoryData', function (req, res) {
  let param = req.body;
  //console.log(param.conid);
  //   var data = {
  //     conversationId: param.conid
  // };
  try {

    knex("web_messages")
      .where("conversationId", param.conid)
      .del()
      .then(function (count) {
        console.log("count");
      });

    var query = knex("web_conversations")
      .where("id", param.conid)
      .del()
      .then(function (count) {
        console.log(count);
      }).finally(function () {
        res.redirect('/');
      });

  }
  catch (e) {
    res.json(e);
  }
});
app.post('/ViewHistoryData', function (req, res) {
  let param = req.body;
  //console.log(param.conid);
  //   var data = {
  //     conversationId: param.conid
  // };
  try {

    knex.select('web_messages.payload')
      .from('web_messages')
      //.leftJoin('web_conversations','web_conversations.id','web_messages.conversationId')
      .where("web_messages.conversationId", param.conid)
      .andWhereNot({ message_type: 'visit' })

      // .orWhere('message_type', '=', 'quick_reply')
      // .orWhere('message_type', '=', 'custom')
      .then(results => {
        res.json(results);

      })

  }
  catch (e) {
    res.json(e);
  }
});

app.post('/historyfetch', function (req, res) {
  let param = req.body;
  try {
      knex.select('event','direction','id')
      .from('events')
     
      .where('channel', '=', 'api')
      .andWhere('target', '=', param.target)
      .andWhere('botId', '=', param.botId)
      .orderBy('id', 'asc')
      .then(results => {
        //  console.log(results)
        res.json(results);
     })
      
  }
  catch (e) {
      res.json(e);
  }
}); 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// var server = app.listen(app.get('port'), function () {
//   console.log('listening');
// });

module.exports = app;
