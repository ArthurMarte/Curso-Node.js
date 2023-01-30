//criando um Model (definir uma tabela do banco de dados)
const Sequelize = require('sequelize')
const connection = require('./database')

//definindo o Model
//para criar um campo coloca o nome (titulo) e o tipo (string)
const Pergunta = connection.define('pergunta' ,{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//criando a tabela no banco
//force:false -> se a tabela já existir no banco ele nao cria outra
Pergunta.sync({force:false}).then(() => {})

//exportar o modulo
module.exports = Pergunta