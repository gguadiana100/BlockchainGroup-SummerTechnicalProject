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
      assert.equal(accounts[0], 0xa9B4d84329C337827Fa174d34B0972815b5fbB43)
    })
  })
})
