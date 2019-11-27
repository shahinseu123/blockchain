const sha256 = require('sha256')
function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
    //CREATE GENESYS BLOCK
    this.createNewBlock(100, '0', '0')
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
   const newBlock = {
       index: this.chain.length + 1,
       timestamp: Date.now(),
       trancsactions: this.pendingTransactions,
       nonce: nonce,
       hash: hash,
       previousBlockHash: previousBlockHash
   }
   this.chain.push(newBlock)
   this.pendingTransactions = []
   return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length-1]
    // return this.chain.pop()
}

Blockchain.prototype.createNewTransection = function(amount, sender, recipient ){
   const newTransaction = {
       amount: amount,
       sender: sender,
       recipient: recipient
   }
   this.pendingTransactions.push(newTransaction)
   return this.getLastBlock()['index'] + 1
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
   const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
   const hash = sha256(dataAsString)
   return hash
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
   let nonce = 0
   let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
   while(hash.substring(0, 4) !== '0000'){
       nonce++
       hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
   }
   return nonce
}

module.exports = Blockchain;