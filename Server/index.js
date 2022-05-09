const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.get('/scores', (req, res) => {
    // Ask Vasu what format he format makes scores easiest for him to read
})

app.listen(port, () => {
    console.log(`InternetScoreTracker server running on port ${port}`)
})