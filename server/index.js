
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')

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
    if (id < 1 || id > 32) return console.error('Invalid Id')
    console.log(`requesting id ${id}`)
    axios.get(`http://swapi.co/api/people/${id}`)
    .then(({ data }) => {
        const speciesURL = data.species[0]
        const films = data.films
        const speciesPromise = getSpecies(speciesURL)
        const filmPromise = getFilms(films)
        Promise.all([filmPromise, speciesPromise])
        .then(prom => {
            data.filmsArr = prom[0]
            data.speciesInfo = prom[1]
            res.json(data)
        })
    })
    .catch(err => console.error('something went wrong\n', err))
})

function getFilms (films) {
    const promiseArr = films.map(film => {
        return axios.get(film)
        .then(({ data }) => {
            const { title, director, producer, release_date } = data
            const filmInfo = {
                title,
                director,
                producer,
                release_date
            }
            return filmInfo
        })
    })
    return Promise.all(promiseArr)
}

function getSpecies (speciesURL) {
    return axios.get(speciesURL)
    .then(({ data }) => {
        const { name, average_lifespan, classification, language } = data
        return { name, average_lifespan, classification, language }
    })
}

http.createServer(app).listen(4000, function() {
    console.log("Express server listening on port 4000")
})