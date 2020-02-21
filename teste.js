//Biblioteca para ler arquivos do sistema 
var fs = require("fs");

//Biblioteca para usar o banco de dados mongo 
var MongoClient = require('mongodb').MongoClient;

//Ler o arquivo json para a memoria do programa
stringJson = JSON.parse(fs.readFileSync("./10-documents.json", "utf8"))

//Exibe o conteudo da variavel
console.log(stringJson);
console.log("\n------------------\n ")

//Abre conexao com o banco de dados
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  //Define o database
  var dbo = db.db("tcc");

  //Calcula o tempo antes
  var antes = Date.now();
  dbo.collection("usuarios").insertMany(stringJson, function (err, res) {
    if (err) throw err;
    //console.log("1's kk document inserted");
  });
  var duracao = Date.now() - antes;
  console.log("levou " + duracao + "ms")
  db.close();
});

//Limpa o banco de dados
const limpaBD = () => MongoClient.connect(url, function (err, db) {
  if (err) throw err;

  var dbo = db.db("tcc");
  dbo
    .collection("usuarios")
    .drop()
    .then((teste) => {
      console.log("Collection apagada com sucesso!" + teste)
    })
  db.close();
});

limpaBD()
 
