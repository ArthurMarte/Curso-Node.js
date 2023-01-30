//importa o módulo do express
const express = require('express')
//copia o express para dentro da variável app
const app = express()
//importa o body-paser
const bodyParser = require('body-parser')
//carrega a conexão com o banco de dados
const connection = require('./database/database')
//importanto o Model pergunta
const Pergunta = require('./database/Pergunta')
//importanto o Model Resposta
const Resposta = require('./database/Resposta')


//Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })




//configurando EJS no Express
//diz para o express usar o ejs como view engines
app.set('view engine', 'ejs')

//definindo que quer utilizar aruivos estáticos (front-end)
app.use(express.static('public'))

//configurando o body parser no express
//esse comando permite que a pessoa envie os dados do formulário
//e o bodyparser vai traduzir os dados em uma estrutura javascript para que possamos usar
app.use(bodyParser.urlencoded({extended: false}))
//Util pra quando estiver trabalhando com API
app.use(bodyParser.json());


//ROTAS
//pegando o parâmetro passado na rota e usando no html
app.get('/', (req, res) => {
    //equivalente ao select * from
    Pergunta.findAll({raw:true, order:[
        ['id','DESC'] //DESC -> DECRESCENTE, ASC -> CRESCENTE
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})


app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})


//rota para receber os dados do formulário
//rotas do tipo servem para receber dados
app.post("/salvarpergunta", (req, res)=> {
    var titulo = req.body.titulo
    var description = req.body.description
    // equivalente ao insert into
    Pergunta.create({
        titulo: titulo,
        description: description
    }).then(() => {
        res.redirect('/')//redireciona para a página principal
    }) 
})



//rota para pergunta
app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id:id}  
    }).then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada

            //buscando todas as respostas para a pergunta
            Resposta.findAll({
                where: {perguntaId : pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }else{ //pergunta não encontrada
            res.redirect('/')
        }
    })
})



//rota para cadastrar respostas
app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.perguntaId

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})



//rodar aplicação
app.listen(8080, () => {
    console.log('App rodando!');
});