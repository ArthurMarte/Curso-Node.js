const express = require('express'); // Importanto o express
const app = express(); // iniciando o express e passando pra variavel app


//nome da rota e o que ela faz
//.get cria a rota
app.get('/', function (req, res) {    //req = requisição, res = resposta
    res.send('<h1>Bem vindo ao meu site!</h1>')

    //res.send('Outra resposta')   -> só pode enviar uma resposta 1 vez, duas respostas n da(conexão fechada)
})



//CRIANDO UM PARÂMETRO NAO OBRIGATÓRIO
//EXEMPLO -> /:frase? 
// só colocar o "?" no fim

//parâmetro obrigatório -> /:frase (sem o "?"" no fim)
app.get('/blog/:frase?', function (req, res) {

    var frase = req.params.frase
    if (frase) {
        res.send('<h2> Frase: ' + frase + '</h2>')
    }
    else {
        res.send('Bem vindo ao meu blog!')
    }
})



//QUERY PARAMS -> não são definidos na rota
app.get('/canal/youtube', function (req, res) {
    var canal = req.query['canal'];

    if (canal) {
        res.send(canal)
    }
    else {
        res.send('Nenhum canal fornecido')
    }

})


// /:nome -> criando um parâmetro na rota, pode ter quantos quiser
// Exemplo -> /:nome/:empresa
app.get('/ola/:nome', function (req, res) {
    // REQ -> DADOS ENVIADOS PELO USUARIO
    //RES -> RESPOSTA QUE VAI SER ENVIADA PARA O USUÁRIO

    var nome = req.params.nome;
    res.send('<h1> Olá ' + nome + '</h1>')
})




//inicia o servidor
//primeiro parâmetro -> porta que o servidor irá rodar
app.listen(4000, function (erro) {
    if (erro) {
        console.log('Ocorreu um erro!')
    }
    else {
        console.log('Servidor iniciado com sucesso!')
    }
})

