// Módulos desta aplicação
const servidorWeb = require('./services/servidor-web.js')
const banco = require('./services/banco-mongo.js')

// Função para iniciar a aplicação

async function inicia() {
    console.log('Iniciando aplicação...')

    try {
        console.log('Inicializando módulo: Banco de dados...')

        await banco.inicializa()
    } catch (err) {
        console.error(err)

        process.exit(1)
    }

    try { 
        console.log('Inicializando módulo: Servidor Web...')

        await servidorWeb.inicializa()
    } catch (err) {
        console.error(err)
        
        process.exit(1)
    }
}


// Inicia a aplicação

inicia()


// Função para finalizar a aplicação de maneira graciosa (gracefull shutdown)

async function finaliza(e) {
    let err = e

    console.log('Finalizando aplicação...')

    try {
        console.log('Encerrando módulo: Servidor Web...')

        await servidorWeb.encerra()
    } catch (e) {
        console.log('Erro ao encerrar Servidor Web', e)

        err = err || e
    }

    try {
        console.log('Encerrando módulo: Banco de dados...')

        await banco.encerra()
    } catch (err) {
        console.log('Erro encontrado', e)

        err = err || e
    }

    console.log('Saindo do processo')

    if (err) {
        process.exit(1)
    } else {
        process.exit(0)
    }
}


// Eventos que podem causa a interrupção da aplicação


// @TODO: Estudar melhor a documentação, pois, parece que se adicionarmos estes eventos
//         em plataformas non-Windows o comportamento pode não ser desejado
//        Revisar documentação: https://stackoverflow.com/questions/62137542/nodejs-how-to-correctly-implement-listeners-for-sigint-sigterm-signals-to-disp
// https://nodejs.org/api/process.html#process_signal_events
// 'SIGTERM' and 'SIGINT' have default handlers on non-Windows platforms that reset the terminal mode before exiting with code 128 + signal number. If one of these signals has a listener installed, its default behavior will be removed (Node.js will no longer exit).

// @TODO: Em tempo de desenvolvimento, caso eu queira fazer encerramento gracioso (grafull shutdown) com o nodemon, eu posso escutar mais eventos
//        Vide documentação


// Cria um listener para o evento SIGTERM

process.on('SIGTERM', () => {
    console.log('Recebido SIGTERM')

    finaliza()
})


// Cria um listener para o evento SIGINT

process.on('SIGINT', () => {
    console.log('Recebido SIGINT')

    finaliza()
})


// Cria um listener para o evento uncaughtException
//  isso captura 

process.on('uncaughtException', err => {
    console.log('Exceção não capturada')
    console.error(err)

    finaliza(err)
})
