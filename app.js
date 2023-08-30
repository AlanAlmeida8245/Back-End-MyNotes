const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const Notas = require("./models/Notas")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("olá")
  
})

app.post("/criar", (req, res) => {
    const newPost = new Notas({
        titulo: req.body.titulo,
        texto: req.body.texto
    })
    newPost.save().then(() => 
    {
        console.log("Nota Criada com Sucesso")
        res.status(200).json({msg: "Nota Criada com Sucesso", dados: newPost})
    
    }).catch((erro) => console.log("erro ao criar a nota", erro))
})

app.patch("/editar", (req, res) => {
    const { id, novotitulo, novotexto } = req.body;

    Notas.findOne(
        { _id: id }, // Filtra pelo ID do documento a ser atualizado
    )
    .then((nota) => {
        if (!nota) {
            return res.status(404).json({ msg: 'Nota não encontrada' });
        }
        nota.texto = novotexto
        nota.titulo = novotitulo
        nota.save().then(() => {
            res.status(200).json(nota)
            console.log("nota foi atualizada com sucesso")
        })
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: 'Erro ao editar a nota' });
    });
});

app.delete("/deletar", (req, res) => {
    console.log(req.body.id)
    Notas.deleteOne({_id: req.body.id}).then(() => {
        res.status(200).json({msg: "Nota Deletada com Sucesso"})
        console.log("Nota deletada com sucesso")
    }).catch((erro) => {
        console.log("erro ao deletar a nota", erro)
        res.status(404).json({msg: "Ocorru um Erro ao deletar a nota"})
    })
})

app.get("/nota/:id", (req, res) => {
    Notas.findOne({_id: req.params.id}).then((Nota) => {
        res.status(200).json(Nota)
    }).catch((erro) => {
        res.status(404).json({msg: "Não foi possivel encontrar a Nota"})
        console.log(erro)
    })
})

app.get("/notas", (req, res) => {

    Notas.find().then((notas) => {
        if(!notas){
            res.status(500).json({msg: "Nenhuma Nota Encontrada"})
        }
        res.status(200).json(notas)
        

    }).catch((err) => {
        console.log("Erro ao Buscar Notas", err)
    })
})

//conexão com o banco de dados
mongoose.connect("mongodb+srv://alanalmeida8245:notes123@cluster0.26jsqwu.mongodb.net/?retryWrites=true&w=majority")


const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
