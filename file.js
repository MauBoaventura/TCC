//Instalar NodeJs
https://nodejs.org/pt-br/download/

//Instalar MongoDB
//npm install mongodb

//Criar arquivo Javascript file.js

//importar a biblioteca para se conectar ao MongoDB
var mongo = require('mongodb');

//Criar um banco de dados chamado tcc
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tcc";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Banco de dados criado!");
    db.close();
});

//Criar um banco de dados chamado tcc
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tcc");
    dbo.createCollection("usuarios", function (err, res) {
        if (err) throw err;
        console.log("Collection criada com sucesso!");
        db.close();
    });
});

//Inserindo dados na coleção usuarios
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tcc");
    var myobj = { nome: "Mauricio", endereco: "UFPI, 38" };
    dbo.collection("usuarios").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

//Inserindo varios dados na coleção usuarios
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tcc");
  var fs = require("fs");
  var myobj = fs.readFileSync("./10-documents.json", "utf8");
  console.log(myobj)
  dbo.collection("usuarios").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
});

//Encontrando o primeiro dado no banco de dados
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tcc");
    dbo.collection("usuarios").findOne({}, function (err, result) {
        if (err) throw err;
        console.log(result.nome);
        db.close();
    });
});

//Encontrando um dado especifico no banco de dados
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tcc");
    var query = { endereco: "UFPI, 38" };
    dbo.collection("usuarios").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
/*
//Apagar um registro do banco de dados com um filtro 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tcc");
  var myquery = { endereco: 'UFPI, 38' };
  dbo.collection("usuarios").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 documentos deletados");
    db.close();
  });
});
*/

//Apagar varios registros do banco de dados com um filtro (que comeca com a letra U))
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tcc");
    var myquery = { endereco: /^U/ };
    dbo.collection("usuarios").deleteMany(myquery, function (err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});

//Calcular tempo de execução
//fn();
var antes = Date.now();
var duracao = Date.now() - antes;
document.body.innerHTML = "levou " + duracao + "ms";
