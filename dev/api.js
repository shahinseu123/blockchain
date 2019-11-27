const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const blockchain = require('./blockchain')
const uuid = require('uuid/v1')

const nodeAddress = uuid().split('-').join('')

const bitcoin = new blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


app.get('/blockchain', (req, res) => {
    res.send(bitcoin)
})

app.post('/transection', (req, res) => {
    // res.send(`The transaction has done for ${req.body.amount} bitcoin`)
   const blockIndex = bitcoin.createNewTransection(req.body.amount, req.body.sender, req.body.recipient)
   res.json({ note: `Transection will be added at Block ${blockIndex}.`})
    // console.log(req.body)
})

app.get('/mine', (req, res) => {

})

app.listen(3000, () => {
    console.log('Listening on the port 3000...')
})