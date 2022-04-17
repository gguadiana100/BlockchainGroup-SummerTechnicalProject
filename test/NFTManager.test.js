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
    })
    it('should match first account on ganache', async () => {
      // change to your own acc on ganache
      assert.equal(accounts[0], "0xB65BBb64B477bE651Ae9Dcb6D89BCE761731bA8F")
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
      await contract.createToken(token_URI_1,'NFT1',{from:accounts[0]})
      //console.log(token_id_1)
      const token_id_1 = await contract.getLatestId()
      assert.equal(token_id_1, 1)
      const requested_uri = await contract.tokenURI(token_id_1)
      assert.equal(requested_uri,token_URI_1)
      const owner_1 = await contract.ownerOf(token_id_1)
      assert.equal(owner_1,accounts[0])
    })
    it('create 2nd token', async () => {
      const token_URI_2 = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWd"
      await contract.createToken(token_URI_2,'NFT2',{from:accounts[1]})
      const token_id_2 = await contract.getLatestId()
      assert.equal(token_id_2, 2)
      const requested_uri = await contract.tokenURI(token_id_2)
      assert.equal(requested_uri,token_URI_2)
      const owner_2 = await contract.ownerOf(token_id_2)
      assert.equal(owner_2,accounts[1])
    })
    it('transfer token', async () => {
      await contract.safeTransferFrom(accounts[0], accounts[1], 1, {from: accounts[0]})
      const owner_1= await contract.ownerOf(1) // should now be accounts[1]
      assert.equal(accounts[1], owner_1)
      const owner_2= await contract.ownerOf(2)
      assert.equal(accounts[1], owner_2)
      const account1_balance = await contract.balanceOf(accounts[1])
      assert.equal(account1_balance, 2)
      const account0_balance = await contract.balanceOf(accounts[0])
      assert.equal(account0_balance, 0)
    })

  })
})

// Here we shouw that contract A and contract B lead to the same address. 
// Work on sepreating those two into two different wallet addresses.
// Peter Feb/13