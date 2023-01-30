//criando a consexão com o sequelize
const Sequelize = require('sequelize')

//construindo a conexão
const connection = new Sequelize('guia_perguntas', 'root', '123', {
    host: 'localhost', //rodando no meu computador
    dialect: 'mysql' // qual tipo de banco quero conectar no sequelize
})

//exportando a conexão
module.exports = connection;