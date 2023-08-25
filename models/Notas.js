
const mongoose = require("mongoose")


const Notas = mongoose.Schema({
    titulo: {
        type: String
    },
    texto: {
        type: String
    }
})


module.exports = mongoose.model('Notas', Notas)




