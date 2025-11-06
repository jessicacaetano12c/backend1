import express, { response } from "express"
import cors from "cors"
import {people} from "./people.js"

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())//prepara o backend para receber informações tipo JSON

app.get("/", (request, response) => {
    response.json(people)
})

app.post("/cadastrar", (request, response) => {
    const { name, email, age, password } = request.body.user

    console.log(`
        Nome: ${name},
        E-mail: ${email},
        Idade: ${age},
        Senha: ${password}
    `)
    //guardar usuário no frontend

    response.status(201).json({message: "Usuário Cadastrado com sucesso!"})

})

app.listen(port, () => {
     console.log(`Servidor rodando na porta: ${port}`)
})