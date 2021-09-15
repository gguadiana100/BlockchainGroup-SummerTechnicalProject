// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";

contract NFTLoan {

  struct Loan {
    // NFT address
    address tokenAddress;
    // NFT owner
    address tokenOwner;
    // Current lender
    address lender;
    // NFT token id
    uint256 tokenId;
    // Fixed interest rate
    uint256 interestRate;
    // Current max bid
    uint256 loanAmount;
    // Timestamp of loan completion
    uint256 loanCompleteTime;
  }

  // Number of loans issued
  uint256 public numLoans;
  // Mapping of loan number to loan struct
  mapping(uint256 => Loan) public Loans;

  function createLoan(
    address _tokenAddress,
    uint256 _tokenId,
    uint256 _interestRate,
    uint256 _loanAmount,
    uint256 _loanCompleteTime
  ) external returns (uint256) {
    // Enforce creating future-dated loan
    require(_loanCompleteTime > block.timestamp, "Can't create loan in past");

    // NFT id
    uint256 loanId = ++numLoans;

    // Transfer NFT from owner to contract
    IERC721(_tokenAddress).transferFrom(msg.sender, address(this), _tokenId);

    // Create loan
    Loans[loanId].tokenAddress = _tokenAddress;
    Loans[loanId].tokenOwner = msg.sender;
    Loans[loanId].tokenId = _tokenId;
    Loans[loanId].interestRate = _interestRate;
    Loans[loanId].loanAmount = _loanAmount;
    Loans[loanId].loanCompleteTime = _loanCompleteTime;


    // Return loan id
    return loanId;
  }


  // connect to auction contract to determine who is the lender.
  function setLender(uint256 _loanId) external{
      Loan storage loan = Loans[_loanId];
      loan.lender = msg.sender;
  }


  // owner of the NFT draw loan
  function drawLoan(uint256 _loanId) external payable{
    Loan storage loan = Loans[_loanId];
    // Prevent non-loan-owner from drawing
    require(loan.tokenOwner == msg.sender, "Must be NFT owner to draw.");

    // transfer the loan money
    (bool sent, ) = payable(msg.sender).call{value: loan.loanAmount}("");
    require(sent, "Failed to draw capital.");

  }

  /**
   * Enables anyone to repay a loan on behalf of owner
   * @param _loanId id of loan to repay
   */
  function repayLoan(uint256 _loanId) external payable {
    Loan storage loan = Loans[_loanId];
    // Prevent repaying repaid loan
    require(loan.tokenOwner != address(0), "Can't repay paid loan.");
    // Prevent repaying loan after expiry
    require(loan.loanCompleteTime >= block.timestamp, "Can't repay expired loan.");

    // Add historic interest paid to previous top bidders + accrued interest to top bidder
    // As of current block (future = 0 seconds)
    uint256 _totalInterest = calculateTotalInterest(_loanId, 0);
    // Calculate additional capital required to process payout
    uint256 _additionalCapital = loan.loanAmountDrawn + _totalInterest;
    // Enforce additional required capital is passed to contract
    require(msg.value >= _additionalCapital, "Insufficient repayment.");

    // Payout current top bidder (loan amount + total pending interest)
    (bool sent, ) = payable(loan.lender).call{value: (loan.loanAmount + _totalInterest)}("");
    require(sent, "Failed to repay loan.");

    // Transfer NFT back to owner
    IERC721(loan.tokenAddress).transferFrom(address(this), loan.tokenOwner, loan.tokenId);

    // Toggle loan repayment (nullify tokenOwner)
    loan.tokenOwner = address(0);

  }

  /**
   * Enables anyone to seize NFT, for lender, on loan default
   * @param _loanId id of loan to seize collateral
   */
  function seizeNFT(uint256 _loanId) external {
    Loan memory loan = Loans[_loanId];
    // Enforce loan is unpaid
    require(loan.tokenOwner != address(0), "Can't seize from repaid loan.");
    // Enforce loan is expired
    require(loan.loanCompleteTime < block.timestamp, "Can't seize before expiry.");

    // Transfer NFT to lender
    IERC721(loan.tokenAddress).transferFrom(address(this), loan.lender, loan.tokenId);

  }


}
