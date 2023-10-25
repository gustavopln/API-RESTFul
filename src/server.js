//express é uma função, precisa ser chamada para retornar uma aplicação em express
const express = require('express')
const cors = require('cors')

const db = require('./database/db')
const routes = require('./routes/routes')

//dentro de app tem vários métodos que vão ajudar a construir o servidor
const app = express()

// conexão com o banco de dados
db.connect()

const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://www.api.com.br'
]
// habilita CORS
app.use(cors({
    origin: function(origin, callback){
        let allowed = true

        // mobile app por exemplo não tem origem, então permite
        if (!origin) allowed = true

        // verifica se a origem está dentro do array de origens permitidas, senão tiver, allowed recebe false e não permite o acesso
        if (!allowedOrigins.includes(origin)) allowed = false

        //o primeiro é nulo porque é uma mensagem que retorna para quem fez a request, nulo retorna msg padrão
        callback(null, allowed)
    }
}))

// definindo um middleware para habilitar server para receber dados via post (formulário)
 //Não será necessário em uma API porque estamos recebendo no corpo da requisição
//app.use(express.urlencoded({ extended: true}))

// habilita server para receber dados em formato json
app.use(express.json())

// definindo as rotas da aplicação
app.use('/api', routes)

// executando o servidor
// Quando instalar em um servidor, o servidor que vai escolher em qual porta vai rodar, para isso usaremos dessa forma
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is lintening on port ${port}`))