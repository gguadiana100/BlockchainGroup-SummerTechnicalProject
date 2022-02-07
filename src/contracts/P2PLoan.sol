// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";

contract P2PLoan is Pausable{
  // ============ Structs ============

  // attaches SafeMath lib to uint datatype
  using SafeMath for uint; 

  enum Status { ACTIVE, ENDED, DEFAULTED }

  // NFT loan post struct
  struct Loan {
    uint loanID;
    address payable lender; // owner of capital
    address payable borrower; // owner of token
    uint NFTtokenID;
    address NFTtokenAddress;
    uint loanAmount;  // principal/capital of loan
    uint interestRate;  // interest rate per period
    uint loanCompleteTimeStamp; // timestamp of loan completion
    Status status;
  }

  // ============ Mutable Storage ============

  // total number of loans created
  uint public numOfLoans;
  // map from loanID to loan instances
  Loan[] public allLoans;
  // address of user who created loan
  address public creator; 

  // ============ Events ============

  event LoanCreated(
    uint id,
    address indexed owner,
    uint tokenId,
    address tokenAddress,
    uint loanAmount,
    uint interestRate,
    uint loanCompleteTimeStamp,
    uint blockTimeStamp
  );

  // Loan drawn by NFT owner
  event LoanDrawn(uint id);
  // Loan repayed by address
  event LoanRepayed(uint id, address lender, address repayer);
  // NFT seized by lender
  event LoanDefault(uint id, address lender, address caller);

  // ============ Modifiers ============

  // checking if a loan is valid
  modifier isValidLoanID(uint loanID) {
          require(
              loanID < numOfLoans,
              "Loan ID is invalid."
          );
          _;
      }
  // controls user authorization for certain functions
  modifier onlyCreator() { 
      require(
          msg.sender == creator,
          "Only the creator of the loan can call this."
      );
      _;
  }

  // ============ Functions ============

  constructor()  {
        creator = msg.sender;
        numOfLoans = 0;
  }


  /**
    creates a new loan object 
   */
  function createLoan(
    address _tokenAddress,
    uint _tokenID,
    uint _loanAmount,
    uint _interestRate,
    uint _loanCompleteTimeStamp
  ) external whenNotPaused returns(uint _numOfLoans) {
 
    require(_interestRate < 100, "Interest must be lower than 100%.");
    require(_loanCompleteTimeStamp > block.timestamp, "Can't create loan in past");
    require(_loanCompleteTimeStamp - block.timestamp < 365 days, "Max loan period is 12 months");


    //TODO: async await for NFT transfer from NFt contract here
    allLoans.push(Loan({
      loanID: numOfLoans,
      lender: payable(address(0x0)), // address of all 0's
      borrower: payable(msg.sender),
      NFTtokenID: _tokenID,
      NFTtokenAddress: _tokenAddress,
      loanAmount: _loanAmount,
      interestRate: _interestRate,
      loanCompleteTimeStamp: _loanCompleteTimeStamp,
      status: Status.ACTIVE
    }));

    numOfLoans = SafeMath.add(numOfLoans, 1);

    emit LoanCreated(
      allLoans[numOfLoans - 1].loanID,
      msg.sender,
      _tokenID,
      _tokenAddress,
      _loanAmount,
      _interestRate,
      _loanCompleteTimeStamp,
      block.timestamp
    );

    return numOfLoans;
  }


  /**
    Enables NFT owner to draw capital from top bid
   */
  function drawLoan(uint _loanID) external isValidLoanID(_loanID){
    
    // Emit draw event
    emit LoanDrawn(_loanID);
  }

  /**
    Enables lender to reclaim NFt by paying borrower
   */
    function repayLoan(uint _loanID) external payable isValidLoanID(_loanID){

      // transfer nft back to owner

    // Emit repayment event 
    emit LoanRepayed(_loanID, creator, msg.sender);
  }

  /**
   Helper function to calculate total amount from interest rate
   */
  function calculateRequiredRepayment(uint _loanID)
      public pure returns (uint) {
    
    // can calculate from backtracking from 
    uint totalAmount = _loanID + 10;

    return totalAmount;
  }
  
  /**
    Allows borrowers to seize nft if loan not paid on time
   */
  function loanDefaulted(uint256 _loanID) external {
    

    // Emit seize event
    emit LoanDefault(_loanID, creator, msg.sender);
  }
  
  // uncomment if you're working on this. this is just to silence warnings

   /**
    gets loan listings
   */
   function getLoan(uint _loanID) external view returns(Loan memory loan) {
     return allLoans[_loanID];
   }

  //  /**
  //   gets all loan listings
  //  */
  //  function getAllLoans() external view returns(int) {
  //    return 0;
  //  }

  //  /**
  //   gets all loan listings that belong to one person
  //  */
  //  function getAllUserLoans(address userAddress) external view returns(int) {
  //    return 0;
  //  }

  // return type needs to be changed accordingly !!


}
