const BlindAuction = artifacts.require('./BlindAuction.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('BlindAuction', (accounts) => {
  let contract

  before(async () => {
    contract = await BlindAuction.deployed()
  })

  describe('deployment', async () => {
    it('should match first account on ganache', async () => {
      // change to your own acc on ganache
      assert.equal(accounts[0], 0x91dF6A7B8cF1507dbda938d135C0C7b956082689)
    })
  })
})
