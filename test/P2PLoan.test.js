const { assert } = require('chai');
require('dotenv').config();
const Web3 = require('web3');

function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

var loanArgs = makeStruct(
  "lender borrower NFTtokenID NFTtokenAddress loanAmount interestRate loanDuration"
);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* commands
  truffle test ./test/P2PLoan.test.js
  truffle test --show-events ./test/P2PLoan.test.js
*/

// SPDX-License-Identifier: GPL-3.0
const P2PLoan = artifacts.require('./P2PLoan.sol')

// change this according to your own ganache
const acc1 = process.env.ADDR_1;
const acc2 = process.env.ADDR_2;


require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('P2PLoan', (accounts) => {
  let contract

  // describe('deployment', async () => {
  //   before(async () => {
  //     contract = await P2PLoan.deployed()
  //   })

  //   it('should read first account on ganache', async () => {
  //     // change to your own acc on ganache
  //     assert.equal(accounts[0], acc1, "contract not deployed correctly")
  //   })
  // })

  // describe('create loan', async () => {
  //   before(async () => {
  //     contract = await P2PLoan.deployed()
  //   })

  //   it('should increase numOfLoans', async () => {
  //       // creates a new loan
  //     const args = new loanArgs(
  //       accounts[0], // lender address
  //       accounts[1], // borrower address
  //       0, // token id
  //       accounts[2], // token address
  //       100, // loan amount
  //       2,  // monthly interest rate 
  //       30, // loan duration in days
  //     );
  //     await contract.createLoan.sendTransaction(
  //       args, { from: accounts[0], gas:3000000} // sent from the lender
  //     );

  //     const n = await contract.numOfLoans.call();
  //     assert.equal(n.toNumber(), 1, "numOfLoan not at 1")
  //   })

  //   it('should populate allLoans with correct data', async () => {
  //     const loan = await contract.getLoan.call(0);
  //     assert.equal(loan.loanID, 0, "loanID incorrect")
  //     assert.equal(loan.lender, accounts[0], "lender address incorrect")
  //     assert.equal(loan.borrower, accounts[1], "borrower address incorrect")
  //     assert.equal(loan.NFTtokenID, 0, "TokenID incorrect")
  //     assert.equal(loan.NFTtokenAddress, accounts[2], "token address incorrect")
  //     assert.equal(loan.loanAmount, 100, "loan amount incorrect")
  //     assert.equal(loan.totalAmountDue, 102, "loan amount due incorrect")
  //     assert.equal(loan.interestRate, 2, "loan interest incorrect")
  //     assert.equal(loan.loanDuration, 30, "duration incorrect")
  //     assert.equal(loan.status, 0, "status incorrect")
  //   })

  //   it('should calculate completeTimeStamp', async () => {
  //     const loan = await contract.getLoan.call(0);
  //     const startTime = Number(loan.loanCreatedTimeStamp)
  //     const endTime = startTime + loan.loanDuration * 86400

  //     assert.equal(loan.loanCompleteTimeStamp, endTime, "complete time stamp incorrect")
  //   })
  // })

  
  describe('repay loan', async () => {
    before(async () => {
      contract = await P2PLoan.deployed()
    })

    it('should repay loan', async () => {
      const args = new loanArgs(
        accounts[0], // lender address
        accounts[1], // borrower address
        0, // token id
        accounts[2], // token address
        2, // loan amount
        50,  // monthly interest rate 
        30, // loan duration in days
      );
  
      await contract.createLoan.sendTransaction(
        args, { from: accounts[0], gas:30000000} 
      );
      // const initialBalance = await contract.getBalance.call(accounts[1])

      await contract.repayLoan.sendTransaction(
        0, 
        { from: accounts[1], 
          value: Web3.utils.toWei(1, "ether"), 
          gas:30000000000}
      );
      
      const loan = await contract.getLoan.call(0);

      // const finalBalance = await contract.getBalance.call(accounts[1])

      assert.equal(loan.status, 1, "status incorrect")
      // assert.equal(finalBalance - initialBalance > 10.2, true, "balance incorrect")
    })
  })



/*
  describe('new function to be tested', () => {
    before(async () => {
      contract = await P2PLoan.deployed()    // always deploy a brand new contract with empty allLoans
    })

    await loanFactory(contract, accounts, 5) // creates 5 new loans
    
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
