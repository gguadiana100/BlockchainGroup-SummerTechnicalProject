// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";

contract P2PLoan is Pausable{
  // ============ Structs ============

  // attaches SafeMath lib to uint datatype
  using SafeMath for uint; 

  enum Status { PENDING, ACTIVE, CANCELLED, ENDED, DEFAULTED }

  // NFT loan post struct
  struct Loan {
    uint loanID;
    address payable lender;
    address payable borrower;
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
  mapping(uint => Loan) public allLoans;
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
    uint loanCompleteTimeStamp
  );
  // New loan lender/bidder
  event LoanUnderwritten(uint256 id, address lender);
  // Loan drawn by NFT owner
  event LoanDrawn(uint id);
  // Loan repayed by address
  event LoanRepayed(uint id, address lender, address repayer);
  // Loan cancelled by NFT owner
  event LoanCancelled(uint id);
  // NFT seized by lender
  event LoanSeized(uint id, address lender, address caller);

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

  function pauseLoans() public onlyCreator {
      _pause();
  }

  function unPauseLoans() public onlyCreator {
      _unpause();
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

    Loan storage l = allLoans[numOfLoans];
    l.loanID = numOfLoans;
    l.lender = payable(address(0x0)); // address of all 0's
    l.borrower = payable(msg.sender);
    l.NFTtokenID = _tokenID;
    l.NFTtokenAddress = _tokenAddress;
    l.loanAmount = _loanAmount;
    l.interestRate = _interestRate;
    l.loanCompleteTimeStamp = _loanCompleteTimeStamp;
    l.status = Status.PENDING;
    numOfLoans = SafeMath.add(numOfLoans, 1);

    emit LoanCreated(
      l.loanID,
      msg.sender,
      _tokenID,
      _tokenAddress,
      _loanAmount,
      _interestRate,
      _loanCompleteTimeStamp
    );

    return numOfLoans;
  }

  /**
    Executes a loan and pays chosen bidder
   */
  function underwriteLoan(uint _loanID) external payable 
    isValidLoanID(_loanID) whenNotPaused{

    emit LoanUnderwritten(_loanID, msg.sender);
  }


  /**
    Enables NFT owner to draw capital from top bid
   */
  function drawLoan(uint _loanID) external isValidLoanID(_loanID) whenNotPaused{

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
  function seizeNFT(uint256 _loanID) external {
    

    // Emit seize event
    emit LoanSeized(_loanID, creator, msg.sender);
  }
  
  /** 
    allows lender to cancel loan post
   */
  function cancelLoan(uint256 _loanID) external {
    
    emit LoanCancelled(_loanID);
  }

   /**
    gets specific of loan posting
   */
   function getLoan(uint _loanID) external view returns(Loan memory loan) {
     return allLoans[_loanID];
   }

}
