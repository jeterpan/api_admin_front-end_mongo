// Módulos desta aplicação
const Admin = require('../db_api/admin')


// Função controller para o método GET

async function get(req, res, next) {

    // @TODO: Revisar, isso deveria ficar em db_api e não aqui no controller

    Admin.find()
        .then(items => res.render('index',{ items }))
        .catch(err => res.status(404).json({ msg: 'No items found'}))
}

module.exports.get = get


// Função controller para o método POST

async function post(req, res, next) {

    // @TODO: Revisar, isso deveria ficar em db_api e não aqui no controller

    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.redirect('/'))
}

module.exports.post = post
