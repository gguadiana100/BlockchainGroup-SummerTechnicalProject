const { assert } = require('chai')

const NFTMarketplace = artifacts.require('NFTMarketplace')
const NFTManager = artifacts.require('NFTManager')

// Truffle Console test
// NFTManager.deployed().then(function(instance){app=instance})

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('NFTMarketplace', (accounts) => {


  describe('start testing', async () => {
    let market_contract
    let nft_contract
    before(async () => {
      market_contract = await NFTMarketplace.deployed()
      nft_contract = await NFTManager.deployed()
    })
    it('create 1st token', async () => {
      
      const token_URI_1 = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=1-PUG.json"
      // somehow token_id_1 returned is not an int.
      await nft_contract.createToken(token_URI_1,'NFT 1',{from:accounts[0]})
      //console.log(token_id_1)
      const token_id_1 = await nft_contract.getLatestId()
      assert.equal(token_id_1, 1)
      const requested_uri = await nft_contract.tokenURI(token_id_1)
      assert.equal(requested_uri,token_URI_1)
      const owner_1 = await nft_contract.ownerOf(token_id_1)
      assert.equal(owner_1,accounts[0])
    })
    it('checking isContract function', async () =>{
        const isContract = await market_contract.isContract(nft_contract.address)
        assert.equal(isContract,true)
    })
    it('checking Lock NFT function', async () =>{
        // console.log("accounts[0]",accounts[0])
        // console.log("contract Addr",nft_contract.address)
        // console.log("market Addr",market_contract.address)

        await nft_contract.approve(market_contract.address,1,{from:accounts[0]})
        await market_contract.lockNFT(nft_contract.address,1,{from:accounts[0]})
        //give permission
        const owner = await nft_contract.ownerOf(1)
        assert.equal(owner,market_contract.address)

      //test if the token can be unlocked
        await market_contract.unlockNFT(nft_contract.address,1,accounts[0])
        const ownerNew = await nft_contract.ownerOf(1)
        assert.equal(ownerNew,accounts[0])
    })
    it('checking Lock NFT function two tokens', async () =>{
      const token_URI_2 = "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=1-PUG.json"
      await nft_contract.createToken(token_URI_2,'NFT 2',{from:accounts[1]})
      await nft_contract.approve(market_contract.address,1,{from:accounts[0]})
      await market_contract.lockNFT(nft_contract.address,1,{from:accounts[0]})
      await nft_contract.approve(market_contract.address,2,{from:accounts[1]})
      await market_contract.lockNFT(nft_contract.address,2,{from:accounts[1]})

      const owner_1 = await nft_contract.ownerOf(1)
      assert.equal(owner_1,market_contract.address)
      const owner_2 = await nft_contract.ownerOf(2)
      assert.equal(owner_2,market_contract.address)

      await market_contract.unlockNFT(nft_contract.address,1,accounts[0])
      const ownerNew_1 = await nft_contract.ownerOf(1)
      assert.equal(ownerNew_1,accounts[0])

      await market_contract.unlockNFT(nft_contract.address,2,accounts[1])
      const ownerNew_2 = await nft_contract.ownerOf(2)
      assert.equal(ownerNew_2,accounts[1])
  })

  })
})
