const express = require('express')
const app = express()
const port = 9102

app.get('/test', (req, res) => {
    res.send(`this is ${port} test!`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
