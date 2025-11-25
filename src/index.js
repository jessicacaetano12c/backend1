import express, { response } from "express"
import cors from "cors"
import mysql from "mysql2"


const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())//prepara o backend para receber informações tipo JSON

app.get("/", (request, response) => {
    const selectCommand = "SELECT name, email, age FROM jessicacaetano_02mc"

    database.query(selectCommand, (error, users) => {
        if(error) {
            console.log(error)
            return
        }

        response.json(users)
    })
})

app.post("/cadastrar", (request, response) => {
    const { name, email, age, password } = request.body.user

    
    //guardar usuário no frontend

    const insertCommand = `
    INSERT INTO jessicacaetano_02mc(name, email, age, password)
    VALUES (?, ?, ?, ?)
    `

    database.query(insertCommand, [name, email, age, password], (error) => {
        if(error) {
            console.log(error)
            return
        }
    })

    response.status(201).json({message: "Usuário Cadastrado com sucesso!"})

})

app.post("/login", (request, response) => {
        const {  email, password } = request.body.user

        const selectCommand = "SELECT * FROM jessicacaetano_02mc WHERE email = ?"

        database.query(selectCommand, [email], (error, user) => {
            if (error) {
                console.log(error)
                return
            }

            if (user.length === 0 || password !== user[0].password) {
                response.json({message: "Email ou senha incorretos!"})
                return
            }

            response.json({id: user[0].id, name: user[0].name})
        })

})

app.listen(port, () => {
     console.log(`Servidor rodando na porta: ${port}`)
})

const database = mysql.createPool({
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    connectionLimit: 10
})