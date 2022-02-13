const { assert } = require('chai')

const NFTManager = artifacts.require('NFTManager')

// Truffle Console test
// NFTManager.deployed().then(function(instance){app=instance})

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('NFTManager', (accounts) => {

  describe('start testing', async () => {
    let contractA
    let contractB
    before(async () => {
      contract = await NFTManager.deployed()
      contractA = await NFTManager.deployed()
      contractB = await NFTManager.deployed()
    })
    it('should match first account on ganache', async () => {
      // change to your own acc on ganache
      assert.equal(accounts[0], "0xe44187E2E4A686C48de0CEb3d0409A33139B4e10")
    })
    it('should match the name and symbol', async () => {
      const contract_name = await contract.name.call()
      const contract_symbol = await contract.symbol.call()
      assert.equal(contract_name,"NFT Manager")
      assert.equal(contract_symbol,"NFTM")
    })
    it('create 1st token', async () => {
      
      const token_URI_1 = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=1-PUG.json"
      // somehow token_id_1 returned is not an int.
      await contract.createToken(token_URI_1,{from:accounts[0]})
      //console.log(token_id_1)
      const token_id_1 = await contract.getLatestId()
      assert.equal(token_id_1, 1)
      const requested_uri = await contract.tokenURI(token_id_1)
      assert.equal(requested_uri,token_URI_1)
    })
    it('create 2nd token', async () => {
      const token_URI_2 = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWd"
      await contract.createToken(token_URI_2,{from:accounts[0]})
      const token_id_2 = await contract.getLatestId()
      assert.equal(token_id_2, 2)
      const requested_uri = await contract.tokenURI(token_id_2)
      assert.equal(requested_uri,token_URI_2)
    })
    it('Acc[0] -> NFT in contractA', async () => { 
      const URI = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=1-PUG.json"
      await contractA.createToken(URI,{from:accounts[0]})
      const NFTid = await contractA.getLatestId()
      const NFTuri = await contract.tokenURI(NFTid)
      assert.equal(URI, NFTuri)
    })
    it('transfer NFT from contractA -> contractB', async () => {
      const URI = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=1-PUG.json"
      let a = await contractA.getAddr()
      let b = await contractB.getAddr()
      contractA.safeTransferFrom(a, b, URI)
      
      console.log(a)
      console.log(b)
    })
  })
})

// Here we shouw that contract A and contract B lead to the same address. 
// Work on sepreating those two into two different wallet addresses.
// Peter Feb/13