const Blockchain = require('./blockchain')

const bitcoin = new Blockchain()

//TEST GENESYS BLOCK
console.log(bitcoin)

// const previousBlockHash = 'IUFGLIVBLEIR756934659'
// const currentBlockData = [
//     {
//         amount: 100,
//         sender: 'IFLGOWU987565896',
//         recipient: 'LSFVHIOEUR987562'
//     },
//     {
//         amount: 200,
//         sender: 'SDHF756T09458HERI',
//         recipient: 'IDBALKJSBCDALI87T6390'
//     },
//     {
//         amount: 300,
//         sender: 'KXJCBVLSI3jhk4086T0293',
//         recipient: 'ZJBVSLIU0jkjhgkjfh9385T6039'
//     }
// ]
// const nonce = 735635

// bitcoin.createNewBlock(846469, 'DKJFGHE654876', 'DLFJGHOEIS958')
// CREATE NEW BLOCK
// bitcoin.createNewBlock(123454, 'JKFGF878569', 'KSJGFILUGF74')
// CREATE NEW tRANSECTION
// bitcoin.createNewTransection(20, 'ALEXFHLSDFK493898T6', 'JENDGSILUGSI94859')
// CREATE NEW BLOCK
// bitcoin.createNewBlock(746457, 'JKFGKFJV856', 'KSGDFEUKR645')
// //CREATE 3 NEW TREANSECTIONS
// bitcoin.createNewTransection(100, 'ALEXFHLSDFK493898T6', 'JENDGSILUGSI94859')
// bitcoin.createNewTransection(345, 'ALEXFHLSDFK493898T6', 'JENDGSILUGSI94859')
// bitcoin.createNewTransection(8576, 'ALEXFHLSDFK493898T6', 'JENDGSILUGSI94859')
// CREATE NEW BLOCK
// bitcoin.createNewBlock(873665, 'JKFGKFLKHVJV856', 'LFIJVKSGDFEUKR645')
// console.log(bitcoin.chain[2])
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce))
// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData))