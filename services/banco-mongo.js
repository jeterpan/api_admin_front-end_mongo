// Módulos de terceiros
const mongoose = require('mongoose')

// Módulos desta aplicação
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = require('../configs/banco-mongo.js')


// Inicializa a conexão com o banco de dados

async function inicializa() {
    
    // Connect to MongoDB

    mongoose
        .connect(
            `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
            //cfgBancoMongo.connectString
            , { useUnifiedTopology: true
                , useNewUrlParser: true }
        )
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

}

module.exports.inicializa = inicializa
