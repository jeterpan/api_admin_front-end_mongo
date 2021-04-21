require('dotenv').config()

module.exports = {

    // Será usado desta forma ao conectar no MongoDB como Mongoose:
    // mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME} 
    
    DB_HOST: process.env.DB_HOST
    , DB_PORT: process.env.DB_PORT
    , DB_NAME: process.env.DB_NAME
    , DB_USER: process.env.DB_USER
    , DB_PASS: process.env.DB_PASS
}
