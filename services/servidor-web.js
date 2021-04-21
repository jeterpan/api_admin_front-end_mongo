// Módulos nativos Node.js
const http = require('https')

// Módulos de terceiro
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')

// Módulos desta aplicação
const configServidorWeb = require('../configs/servidor-web.js')
const roteador = require('../services/roteador.js')


// @TODO: Ideia: Testar: Como o Node.js não termina seu processo enquanto tem algo para fazer:
//         Pode ser que como não estamos usando o resolve da função abaixo, está
//         deixando o Node.js em loop, apenas excutando os eventos.
//        Checar se esse conceito procede, porque já aconteceu de eu criar,
//         em outros projetos, funções de loop para evitar que o Node.js finalize
//         e pode ser que isso não seja necessário

// Inicializa servidor Web

let httpServer

function inicializa() {
    return new Promise( (resolve, reject) => {

        const app = express()

        // @TODO: "app.use(cors())" isso está liberado tudo ref a cors?
        //        Entender melhor como configurar corretamente isso no Node.js

        app.use(cors())

        app.set('view engine', 'ejs')

        // Configura o Express.js para conseguir capturar "query string" da URL
        //  false - usa biblioteca query string (não suporta aninhamento de objetos)
        //   https://www.npmjs.com/package/query-string
        //  true - usa biblioteca qs (suporta aninhamento de objetos)
        //   https://www.npmjs.com/package/qs

        app.use(express.urlencoded({ extended: false }))

        httpServer = http.createServer(app)

        app.use(morgan('combined'))

        app.use('/', roteador)

        httpServer.listen(configServidorWeb.porta)
            .on('listening', () => {
                console.log(`Servidor Web escutando em localhost:${configServidorWeb.porta}`)
            })
            .on('error', err => {
                reject(err)
            })
    })
}

module.exports.inicializa = inicializa


// Encerra servidor Web

function encerra() {
    return new Promise( (resolve, reject) => {
        httpServer.close( (err) => {
            if (err) {
                reject(err)
                return
            }

            resolve()
        })
    })
}

module.exports.encerra = encerra
