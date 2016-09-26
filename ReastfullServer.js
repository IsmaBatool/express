var express = require('express');
var app = express();
var path    = require("path");
var multer    = require("multer");
var mysql      = require('mysql');
var bcrypt=require("bcrypt-nodejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
});
var upload = multer({ storage: storage });



//creating Mysql connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database: 'USER',
  password : '123'
});
connection.connect();



//expire user in timer 
var expireUserTimer=setInterval(function(){ 
  console.log("Check for expiring user"); 
  connection.query("update user set status=0 where TIMESTAMPDIFF(MINUTE,creationDate,NOW())>60",function(err,data,fields){

  });

}, 20000);


app.use(express.static('public'));



//render index view on start
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});


// get list of of users
app.get('/getUsers', function (req, res) {
  connection.query("select user_id,email,name,creationDate,user_id as id,gender,avatar from user where status=1", function(err, data, fields) {
    if (err) throw err;
    res.json(data);
  });
});


// Delete a user
app.delete('/getUsers/:id', function (req, res) {
  var id=req.param("id");
  connection.query("delete from user where user_id="+id, function(err, data, fields) {
    if (err) throw err;
    res.json(data);
});
  });




// Update a User
app.put('/getUsers/:id?', function (req, res) {
  var _res=res;
  var id=req.param("id");
  req.on('data', function (dataCleint) {
    var user=JSON.parse(dataCleint);
    connection.query("update user set email='"+user.email+"',name='"+user.name+"',gender='"+user.gender+"' where user_id="+id, function(err, data, fields) {
      if (err) throw err;
      res.json(data);
      });
      
  });

});


// Add a user
app.post('/getUsers', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    var dat= new Date();
    var Cleintdate=formatDate(dat);
    var hashedPassword=bcrypt.hashSync(data.password);
    connection.query("insert into user (name,email,password,creationDate,gender) values('"+data.name+"','"+data.email+"','"+hashedPassword+"','"+Cleintdate+"','"+data.gender+"')", function(err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
      
  });
});


// get count of expired and total users
app.get('/getCountUsers', function (req, res) {
  connection.query("select count(*) as totalUsers ,\
   (select count(*) from user where status=0) as expiredUsers from user", function(err, data, fields) {
    if (err) throw err;
    res.json(data);
  });
});



// upload User Image
app.post('/uploadAvatar/:idr',upload.single('avatar'), function (req, res) {
  var userId=req.param("idr");
  var path=(req.file.path).split("/");
  path=path[path.length-1];
  var pathTemp=req.headers.origin+"/"+"uploads/"+path;
  connection.query("update user set avatar='"+pathTemp+"' where user_id="+userId, function(err, data, fields) {
    res.json({status :true , message: "Picture uploaded"});
  });
});



// get count of expired and total users
app.get('/getBarGraphData', function (req, res) {
  connection.query("select count(*) as activeUsers , MONTH(creationDate) as month from user where status=1 and YEAR(creationDate)=YEAR(NOW()) group by MONTH(creationDate) order by creationDate", function(err, data, fields) {
  if (err) throw err;
  var dataStruct={};
  for( var i=0;i<data.length;i++){
    dataStruct[data[i].month]=data[i];
    dataStruct[data[i].month].expiredUsers=0;

  }
    connection.query("select count(*) as expiredUsers , MONTH(creationDate) as month from user where status=0  and YEAR(creationDate)=YEAR(NOW()) group by MONTH(creationDate) order by creationDate", function(err, data2, fields) {
      if (err) throw err;
      for( var i=0;i<data2.length;i++){
        if(dataStruct[data2[i].month]){
          dataStruct[data2[i].month].expiredUsers=data2[i].expiredUsers;}
        else{
          dataStruct[data2[i].month]=data2[i];
          dataStruct[data2[i].month].activeUsers=0;
        }

      }
      var newData=formateDataForBarChart(dataStruct);
      res.json(newData);
    });
  });
});



// server listening
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("RESFULL SERVER LISTENING ON PORT 8081", host, port)
});



// fromate data to represent properly in barChart
function formateDataForBarChart (data){
  var labels =['errorData','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','aug','sep','oct','nov','dec'];
  var label=[];
  var expiredUsers=[];
  var activeUsers=[];
  var count=0;
  for (var i in data) {
    label[count]=labels[data[i].month];
    expiredUsers[count]=data[i].expiredUsers;
    activeUsers[count]=data[i].activeUsers;
    count=count+1;
  }
  return {"expiredUsers":expiredUsers,"activeUsers":activeUsers,"label":label};

}

// formatedate 
function formatDate(date) {
  var d = new Date,
  dformat = [d.getFullYear(),
               (d.getMonth()+1).padLeft(),
               d.getDate().padLeft()].join('-') +' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');
  return dformat;
}
Number.prototype.padLeft = function(base,chr){
  var  len = (String(base || 10).length - String(this).length)+1;
  return len > 0? new Array(len).join(chr || '0')+this : this;
}