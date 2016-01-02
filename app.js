var express = require('express');
var app = express();
var sql = require('mysql');

var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'classicmodels'
});


app.set("view engine","ejs");
//app.use( "view", __dirname + "/views");

app.get('/', function( request, response ){
	response.render("index",{title:"the first mean app"});
});

app.get('/users', function( request, response ){
	getAllEmployees(request,response);
});

app.get('/user/:id', function( request, response ){
	getAllEmployeById(request,response);
});


function getAllEmployees(req, res){
	pool.getConnection( function(err, conn){
		conn.query( "select * from employees" , function(err, rows) {
             if (!err)
			{
				//res.json( rows );
				//console.log('rows fetchec : ', rows);
				res.render("users", {rows : rows});
			}else{
				console.log('Error while performing the query..check function getAllEmployees() for more details..', err);
			}
         })
	});

}

function getAllEmployeById(req, res){
	if (!req.params.id) {return };
	pool.getConnection( function(err, conn){
		conn.query( "select * from employees where employeeNumber='"+req.params.id+"'" , function(err, row) {
             if (!err)
			{
				//res.json( rows );
				//console.log('rows fetchec : ', rows);
				res.render("user", {row : row[0]});
			}else{
				console.log('Error while performing the query..check function getAllEmployeById() for more details..', err);
			}
         })
	});

}


/*app.get('/user/:id', function( request, response ){
	response.send("user with id :" + request.params.id );
});*/

app.listen(1735, function(){
	console.log('site running on port 1735..');
});



