var http = require('http');  //modulo http vem no node

http.createServer(function (requisicao, resposta) {
    resposta.end('Bem vindo ao meu site')
}).listen(8181)


console.log("Meu servidor está rodando")