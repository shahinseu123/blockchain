const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const blockchain = require('./blockchain')
const uuid = require('uuid/v1')
const port = process.argv[2]
const rp = require('request-promise')

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
    const lastBlock = bitcoin.getLastBlock()
    const previousBlockHash = lastBlock['hash']
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: bitcoin.getLastBlock['index'] + 1
    }


    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)

    const hash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)

    bitcoin.createNewTransection(12.5, '00', nodeAddress)

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash)
    res.json({
         note: "New block mined successfully",
         block: newBlock
     })

})

// REGISTER A NODE AND BROADCAST IT to the ENTIRE NETWORK
app.post('/resister-and-broadcast-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl)
    //BROADCAST TO ALL NODES
    const registerNodePromises = []
    bitcoin.networkNodes.forEach(networkNodeUrl => {
       const requestOptions = {
           uri: networkNodeUrl + '/register-node',
           method: POST,
           body: { newNodeUrl: newNodeUrl },
           json: true
       }
       registerNodePromises.push(rp(requestOptions))
    })
    Promise.all(registerNodePromises)
           .then(data => {
               const bulkRegisterOption = {
                   uri: newNodeUrl + '/register-nodes-bulk',
                   method: POST,
                   body: { allNetworkNods: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
                   json: true
               }
               return rp(bulkRegisterOption)
           })
           .then(data => {
               res.json({ note: 'New node registered with network successfully'})
           })

})

//REGISTER A NODE WITH THE NETWORK
app.post('/register-node', (req, res) => {
   const newNodeUrl = req.body.newNodeUrl
   const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1
   const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
   if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl)
   res.json({ note: 'new node registered successfully'})
})

app.post('/register-nodes-bulk', (req, res) => {

})

//REGISTER MULTIPLE NODES AT ONCE
app.listen(port, () => {
    console.log(`Listening on port ${port} on the server`)
})