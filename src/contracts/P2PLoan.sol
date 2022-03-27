// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";

contract P2PLoan {
  // ============ Structs ============

  // attaches SafeMath lib to uint datatype
  using SafeMath for uint; 

  enum Status { ACTIVE, ENDED, DEFAULTED }

  // NFT loan post struct
  struct Loan {
    uint loanID;
    address payable lender; // owner of capital
    address payable borrower; // owner of NFT
    uint NFTtokenID;
    address NFTtokenAddress;
    uint loanAmount;  // principal/capital of loan
    uint totalAmountDue; //loan amount + interest
    uint interestRate;  // interest rate per month
    uint loanCreatedTimeStamp; // unix time
    uint loanDuration; // number of days
    uint loanCompleteTimeStamp; // unix time
    Status status;
  }

  // ============ Mutable Storage ============

  // total number of loans created
  uint public numOfLoans;
  // map from loanID to loan instances
  Loan[] public allLoans;
  // map userID to loans on borrow
  mapping(address => uint[]) public userBorrow; 
  // map user to loans on lend
  mapping(address => uint[]) public userLend; 


  // ============ Events ============

  event LoanCreated(
    uint id,
    address indexed owner,
    address borrower,
    uint tokenId,
    address tokenAddress,
    uint loanAmount,
    uint totalAmountDue,
    uint interestRate,
    uint loanCreatedTimeStamp,
    uint loanDuration
  );

  // Loan drawn by NFT owner
  event LoanDrawn(uint id, address lender, uint amountDrawn);
  // Loan repayed by address
  event LoanRepayed(uint id, address repayer);
  // NFT seized by lender
  event LoanDefault(uint id, address caller);
  // console.Log for debuggin in soliditiy 
  event consoleLog(string s);

  // ============ Modifiers ============

  // checking if a loan is valid
  modifier isValidLoanID(uint loanID) {
          require(
              loanID < numOfLoans,
              "Loan ID is invalid."
          );
          _;
      }

  // ============ Functions ============

  /**
    creates a new loan object 
   */
  function createLoan(
    address _lender,
    address _borrower,
    address _tokenAddress,
    uint _tokenID,
    uint _loanAmount,
    uint _interestRate,
    uint _loanDuration
  ) external returns(uint _numOfLoans) {
 
    require(_interestRate < 100, "Interest must be lower than 100%.");
    require(_loanDuration > 0, "Can't create loan in past");
    require(_loanDuration < 360, "Max loan period is 12 months/360 days");
    require(_loanDuration % 30 == 0, "loan period must be in 30 day intervals");

    //TODO: async await for NFT transfer from NFt contract here

    uint durationInUnix = SafeMath.mul(_loanDuration, 86400);
    uint _loanCompleteTimeStamp = SafeMath.add(durationInUnix, block.timestamp);
    require(_loanCompleteTimeStamp > block.timestamp, "can't create loan in the past");

    // calculate total payment due
    uint numOfMonths = SafeMath.div(_loanDuration, 30);
    uint totalInterestRate =  SafeMath.mul(numOfMonths, _interestRate);
    uint totalInterestDue = SafeMath.mul(totalInterestRate, _loanAmount);
    int128 realInterestDue = ABDKMath64x64.divu(totalInterestDue, 100);
    uint unsignedRealInterestDue = ABDKMath64x64.toUInt(realInterestDue);
    uint _totalAmountDue = SafeMath.add(unsignedRealInterestDue, _loanAmount);

    // add loan to allLoans array 
    allLoans.push(Loan({
      loanID: numOfLoans,
      lender: payable(_lender),
      borrower: payable(_borrower),
      NFTtokenID: _tokenID,
      NFTtokenAddress: _tokenAddress,
      loanAmount: _loanAmount,
      totalAmountDue: _totalAmountDue,
      interestRate: _interestRate,
      loanCreatedTimeStamp: block.timestamp,
      loanDuration: _loanDuration,
      loanCompleteTimeStamp: _loanCompleteTimeStamp,
      status: Status.ACTIVE
    }));

    // store loan id in user arrays for easier read access
    userBorrow[_borrower].push(numOfLoans);
    userLend[_lender].push(numOfLoans);

    // execute transaction
    (bool sent, ) = payable(_lender).call{value: _loanAmount}("");
    require(sent, "Failed to draw capital");
    emit LoanDrawn(numOfLoans, _lender, _loanAmount);

    // adjust nums of loans according and emit event
    numOfLoans = SafeMath.add(numOfLoans, 1);
    uint index = SafeMath.sub(numOfLoans, 1);
    Loan storage l = allLoans[index];

    emit LoanCreated(
      allLoans[index].loanID,
      l.lender,
      l.borrower,
      l.NFTtokenID,
      l.NFTtokenAddress,
      l.loanAmount,
      l.totalAmountDue,
      l.interestRate,
      l.loanCreatedTimeStamp,
      l.loanDuration
    );

    return numOfLoans;
  }

  /**
    Enables lender to reclaim NFt by paying borrower (always pay in full)
   */
  function repayLoan(uint _loanID) external payable isValidLoanID(_loanID){
    Loan storage loan = allLoans[_loanID];
    // Prevent repaying repaid loan
    require(loan.status == Status.ACTIVE, "Can't repay paid or defaulted loan.");
    // Prevent repaying loan after expiry
    require(loan.loanCompleteTimeStamp >= block.timestamp, "Can't repay expired loan.");
    // must be borrower to repay loan
    require(loan.borrower == msg.sender, "only borrower can repay loan");

    // transfer nft back to owner

    // change loan status to ended

    // Emit repayment event 
    emit LoanRepayed(_loanID, msg.sender);
  }

  /**
    Allows borrowers to seize nft if loan not paid on time
   */
  function loanDefaulted(uint256 _loanID) external {
    Loan storage loan = allLoans[_loanID];
    // Prevent repaying repaid loan
    require(loan.status == Status.ACTIVE, "Can't default paid or already defaulted loan.");
    // Prevent repaying loan after expiry
    require(loan.loanCompleteTimeStamp < block.timestamp, "Can't default active loans.");


    // call nft function

    // Emit seize event
    emit LoanDefault(_loanID, msg.sender);
  }
  

   /**
      read functions for frontend
   */
  function getLoan(uint _loanID) external view returns(Loan memory) {
    return allLoans[_loanID];
  }

  function getUserLoanOnBorrow() external view returns(uint[] memory) {
     return userBorrow[msg.sender];
  }

    function getUserLoanOnLend() external view returns(uint[] memory) {
     return userLend[msg.sender];
  }

  // problems
  // calculate interest based on 30-day interval  
  // front end needs to conform to this
  // gas fees for borrowing. auto detect outside of loan?
  // extend loans
  // borrower has to call repayloan, not through another contract

}
