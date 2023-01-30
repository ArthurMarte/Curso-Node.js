//importa o módulo do express
const express = require('express')

//copia o express para dentro da variável app
const app = express()


//configurando EJS no Express
//diz para o express usar o ejs como view engines
app.set('view engine', 'ejs')

//definindo que quer utilizar aruivos estáticos (front-end)
app.use(express.static('public'))

//cria rota de teste
//res.render("index") -> renderiza o HTML do arquivo index.ejs dentro da pasta views
/*app.get('/', (req, res) => {
    var nome = 'Arthur Marciano'
    var lp = 'Python'
    res.render('index', {
        nome: nome,
        lp: lp,
        empresa: 'Guia do programador'
    });
});*/

//pegando o parâmetro passado na rota e usando no html
app.get('/:nome/:lp', (req, res) => {
    var nome = req.params.nome
    var lp = req.params.lp
    var exibirMsg = true

    var produtos = [
        {nome: 'Doritos', preco:4.00},
        {nome: 'Coca-cola', preco:5.00},
        {nome: 'Banana', preco:3.15}
    ]

    res.render('index', {
        nome: nome,
        lp: lp,
        empresa: 'Guia do programador',
        msg: exibirMsg,
        produtos: produtos
    });
});


//rodar aplicação
app.listen(8080, () => {
    console.log('App rodando!');
});