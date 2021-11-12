// SPDX-License-Identifier: GPL-3.0
const P2PLoan = artifacts.require('./P2PLoan.sol')

// change this according to your own ganache
const acc1 = 0xa9B4d84329C337827Fa174d34B0972815b5fbB43;
const acc2 = 0xaf3e0cCe71418edA376bE382d48C3e96aC88A20e;

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('P2PLoan', (accounts) => {
  let contract

  before(async () => {
    contract = await P2PLoan.deployed()
  })

  describe('deployment', async () => {
    it('should read first account on ganache', async () => {
      // change to your own acc on ganache
      assert.equal(accounts[0], acc1, "contract not deployed correctly")
    })
  })

  describe('create loan', async () => {
    it('should create a new loan betweene first and second ', async () => {
      // change to your own acc on ganache
      assert.equal(accounts[0], 0xa9B4d84329C337827Fa174d34B0972815b5fbB43)
    })
  })
})
