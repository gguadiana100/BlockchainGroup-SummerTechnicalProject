const { assert } = require('chai');

// SPDX-License-Identifier: GPL-3.0
const P2PLoan = artifacts.require('./P2PLoan.sol')

// change this according to your own ganache
const acc1 = 0xAd4f27e8c72eA67506dfE4F5b9956019654867Ae;
const acc2 = 0xAb93808f7BF3c8dABEbDC5b743900c2373271F6f;


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

  describe('create loan', () => {
    it('should increase numOfLoans', async () => {
      await contract.createLoan.sendTransaction(
        accounts[1], 0, 100, 2, Math.round(Date.now() / 1000) + 100, // normalize to seconds then add 100 seconds 
        { from: accounts[0] }
      );
      const n = await contract.numOfLoans.call();
      assert.equal(n.toNumber(), 1, "numOfLoan not at 1")
    })

    it('should populate allLoans with correct data', async () => {
      const loan = await contract.getLoan.call(0);
      assert.equal(loan.loanID, 0, "loanID incorrect")
      assert.equal(loan.lender, 0x0, "lender address incorrect")
      assert.equal(loan.borrower, accounts[0], "borrower address incorrect")
      assert.equal(loan.NFTtokenID, 0, "TokenID incorrect")
      assert.equal(loan.NFTtokenAddress, accounts[1], "token address incorrect")
      assert.equal(loan.status, 0, "status incorrect")
    })
  })
/*
  describe('new function', () => {
    it('should behave like this', async () => {
      # calling a function that changes the block chain directly requires 
      # .sendTransaction(arg1, arg2, ......, {from: accounts[0]})
      # in this case accounts[0] should be the msg.sender

      await contract.createUpdateOrDeleteFunc.sendTransaction(
        arg1Var, arg2Var,
        { from: accounts[0] }
      );

      # calling a function, usually a read function, that only reads data and doesn't change the blockchain directly
      #  need to use .call()
      #  also all function calls from the contract will need to use await
      #  code sample: 

      const n = await contract.readSomeVarFunc.call();

      #  good practice to include failure message for easier debugging when you have more assert statements
      # assert.equal(n.field_1, expectedValue1, "expectedValue is not n2")
      # assert.equal(n.field_2, expectedValue2, "expectedValue is not n2")
    })

    it('should also behave like this', async () => {
      # more tests for the same function
    })
  })
*/
})
