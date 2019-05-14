
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
// const bcrypt = require('bcrypt')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next()
})

app.get("/people/:id", (req, res) => {
    const id = req.params.id
    console.log(`requesting id ${id}`)
    axios.get(`http://swapi.co/api/people/${id}`)
    .then(({ data }) => {
        res.json(data)
    })
})

// app.post("/user", (req, res, next) => {
//     const { first_name, last_name, email, password } = req.body
//     bcrypt.hash(password, 10, (err, hash) => {
//         return User.create({
//             first_name,
//             last_name,
//             email,
//             password: hash
//         })
//         .then(() => res.send('User successfully created'))
//         .catch(err => {
//             console.error(err)
//             next()
//         })
//     })
// })

// app.post("/home", function(req, res, next) {
//     const { longitude, latitude, UserId } = req.body
//     return Home.create({
//         longitude: parseFloat(longitude),
//         latitude: parseFloat(latitude),
//         UserId
//     })
//     .then(() => {
//         res.end(`Successfully added home location at 
//         \nlatitude:${latitude}
//         \nlongitude:${longitude}
//     `)
//     })
//     .catch(err => {
//         console.error(err)
//         next()
//     })
// })

// app.get("/user", (req, res) => {
//     res.end()
//     return User.findAll()
//     .then(user => {
//         console.log(user[0].dataValues)
//         res.send(user[0].dataValues)
//     })
// })

// app.get("/home", (req, res) => {
//     return Home.findAll()
//     .then(home => {
//         console.log(home[0].dataValues)
//         res.status(200).send(home)
//     })
// })

http.createServer(app).listen(4000, function() {
    console.log("Express server listening on port 4000")
})