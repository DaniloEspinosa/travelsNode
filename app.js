const express = require('express')
const app = express()
const data = require("./travels.json")

const PORT = 4001

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {

    let menu = ""
    data.forEach((viaje) => {
        menu += `<a href="${viaje.id}">${viaje.lugar}</a>`
    })

    let title = ""
    let h2 = ""
    let descripcion = ""
    let precio = ""
    let img = ""

    data.forEach((viaje) => {
        if (viaje.id == "/") {
            title = viaje.lugar
            h2 = viaje.nombre
            descripcion = viaje.descripcion
            precio = viaje.precio
            img = viaje.img
        }
    })
    // res.sendFile(`index.html`, {root: __dirname + '/public'})
    res.render('index', {titulo: title, subtitulo: h2, descripcion: descripcion, precio: precio, imagen: img, menu: menu})
})


app.get('/:nombre', (req, res) => {

    const nombre = req.params.nombre

    let menu = ""
    data.forEach((viaje) => {
        menu += `<a href="${viaje.id}">${viaje.lugar}</a>`
    })

    let title = ""
    let h2 = ""
    let descripcion = ""
    let precio = ""
    let img = ""

    data.forEach((viaje) => {
        if (viaje.id == nombre) {
            title = viaje.lugar
            h2 = viaje.nombre
            descripcion = viaje.descripcion
            precio = viaje.precio + "€"
            img = viaje.img
        }
    })

    res.render('index', { titulo: title, subtitulo: h2, descripcion: descripcion, precio: precio, imagen: img, menu: menu })
})

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
})