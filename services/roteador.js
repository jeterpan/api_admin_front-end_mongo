// Módulos de terceiro
const express = require('express')

// Módulos desta aplicação
const roteador = new express.Router()
const admin = require('../controllers/admin.js')


// Rota principal para administração da API

roteador.route('/')
    .get(admin.get)


// Rota para adicionar usuário

roteador.route('/item/add')
    .post(admin.post)


// Exporta roteador para ele poder ser utilizado na aplicação
module.exports = roteador
