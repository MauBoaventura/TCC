//Biblioteca para ler arquivos do sistema 
var fs = require("fs");

//Biblioteca para usar o banco de dados mongo 
var MongoClient = require('mongodb').MongoClient;

//Ler o arquivo json para a memoria do programa
stringJson10 = JSON.parse(fs.readFileSync("./10-documents copy.json", "utf8"))
stringJson100 = JSON.parse(fs.readFileSync("./100-documents.json", "utf8"))
stringJson1000 = JSON.parse(fs.readFileSync("./1000-documents.json", "utf8"))

//Exibe o conteudo da variavel
//console.log(stringJson);
//console.log("\n------------------\n ")

//Abre conexao com o banco de dados
var url = "mongodb://localhost:27017/";
const insere10 = () => MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  //Define o database
  var dbo = db.db("tcc");

  //Calcula o tempo antes
  var antes = Date.now();
  dbo.collection("usuarios").insertMany(stringJson10, function (err, res) {
    if (err) throw err;
    //console.log("1's kk document inserted");
  });
  var duracao = Date.now() - antes;
  console.log("levou " + duracao + "ms")
  db.close();
});

const insere100 = () => MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  //Define o database
  var dbo = db.db("tcc");

  //Calcula o tempo antes
  var antes = Date.now();
  dbo.collection("usuarios").insertMany(stringJson100, function (err, res) {
    if (err) throw err;
    //console.log("1's kk document inserted");
  });
  var duracao = Date.now() - antes;
  console.log("levou " + duracao + "ms")
  db.close();
});

const insere1000 = () => MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  //Define o database
  var dbo = db.db("tcc");

  //Calcula o tempo antes
  var antes = Date.now();
  dbo.collection("usuarios").insertMany(stringJson1000, function (err, res) {
    if (err) throw err;
    //console.log("1's kk document inserted");
  });
  var duracao = Date.now() - antes;
  console.log("levou " + duracao + "ms")
  db.close();
});

//Limpa o banco de dados
const limpaBD = () => MongoClient.connect(url, function (err, db) {
  try {
    var dbo = db.db("tcc");
    dbo
      .collection("usuarios")
      .drop()
      .then((teste) => {
        console.log("Collection apagada com sucesso!" + teste)
      }).finally(() => {
        db.close();
      })
  } catch (error) {
    console.log("Ocorreu o seguint errro: " + error)
  }
});

//insere10()

//limpaBD()

function main() {
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      insere1000();
    }, 100);

    setTimeout(() => {
      limpaBD();
    }, 1000);
  });
}



// run connect (self-executing async function)
(async () => {
  await main();
})();


//COMENTARIOS


// //Instalar NodeJs
// https://nodejs.org/pt-br/download/

// //Instalar MongoDB
// //npm install mongodb

// //Criar arquivo Javascript file.js

// //importar a biblioteca para se conectar ao MongoDB
// var mongo = require('mongodb');

// //Criar um banco de dados chamado tcc
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/tcc";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Banco de dados criado!");
//     db.close();
// });

// //Criar um banco de dados chamado tcc
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("tcc");
//     dbo.createCollection("usuarios", function (err, res) {
//         if (err) throw err;
//         console.log("Collection criada com sucesso!");
//         db.close();
//     });
// });

// //Inserindo dados na coleção usuarios
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("tcc");
//     var myobj = { nome: "Mauricio", endereco: "UFPI, 38" };
//     dbo.collection("usuarios").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

// //Inserindo varios dados na coleção usuarios
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("tcc");
//   var fs = require("fs");
//   var myobj = fs.readFileSync("./10-documents.json", "utf8");
//   console.log(myobj)
//   dbo.collection("usuarios").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     db.close();
//   });
// });

// //Encontrando o primeiro dado no banco de dados
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("tcc");
//     dbo.collection("usuarios").findOne({}, function (err, result) {
//         if (err) throw err;
//         console.log(result.nome);
//         db.close();
//     });
// });

// //Encontrando um dado especifico no banco de dados
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("tcc");
//     var query = { endereco: "UFPI, 38" };
//     dbo.collection("usuarios").find(query).toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });
// /*
// //Apagar um registro do banco de dados com um filtro 
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("tcc");
//   var myquery = { endereco: 'UFPI, 38' };
//   dbo.collection("usuarios").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 documentos deletados");
//     db.close();
//   });
// });
// */

// //Apagar varios registros do banco de dados com um filtro (que comeca com a letra U))
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("tcc");
//     var myquery = { endereco: /^U/ };
//     dbo.collection("usuarios").deleteMany(myquery, function (err, obj) {
//         if (err) throw err;
//         console.log(obj.result.n + " document(s) deleted");
//         db.close();
//     });
// });

// //Calcular tempo de execução
// //fn();
// var antes = Date.now();
// var duracao = Date.now() - antes;
// document.body.innerHTML = "levou " + duracao + "ms";