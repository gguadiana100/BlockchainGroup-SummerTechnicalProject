//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTManager is ERC721URIStorage { 
    event returnTokenId(
        uint256 _tokenId
    );
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    constructor() ERC721("NFT Manager", "NFTM") {
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        uint256 oldItemId = _tokenIds.current();
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        require(newItemId == oldItemId + 1, "not incrementing");
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // emit returnTokenId(newItemId);
        return newItemId;
    }
    function getLatestId() view public returns (uint256){
        return _tokenIds.current();
    }
}

// pragma solidity ^0.8.0;
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// // import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// import "@openzeppelin/contracts/security/Pausable.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "abdk-libraries-solidity/ABDKMath64x64.sol";


// contract NFTManager {

// 	// Organizing based on NFT listing
// 		// NFTContract: an address
// 		// minLoan: minimum amount of money
// 		// minDuration: minimum terms
// 		// maxInterest: maximum interest rate
// 		// auctionStartTime
// 		// auctionDuration
// 		// numBids
// 		// acceptedLoanAddress: optional 
// 		// executed = false => current auction is live, true => current auction is done
// 	struct NFTListing {
// 	}

// 	// Organizing a bid based on loan provider
// 		// Loan’s address: address of the loan
// 		// duration
// 		// Interest
// 		// Loan amount
// 	struct LoanBid {
// 	}

// 	// Organizing based on one struct
// 		// NFT address
// 		// NFT owner
// 		// Current lender
// 		// NFT token id
// 		// Fixed interest rate
// 		// Current max bid
// 		// Timestamp of loan completion
// 	struct Loan {
// 		address tokenAddress;
// 		address tokenOwner;
// 		address lender;
// 		uint256 tokenId;
// 		uint256 interestRate;
// 		uint256 loanAmount;
// 		uint256 loanCompleteTime;
// 	}

// 	// Mapping every NFT to a mapping from loan index to loan bid
// 	mapping(NFTListing => mapping (LoanIndex => LoanBid)) biddingInformation;

// 	// require to be owner or authorized;
// 	// transfer NFT to holder;
// 	// make NFT Listing(_minLoan, _minDuration, _maxInterest);
// 	// return true;
// 	function setNFTAsAvailable (_NFTContract, _minLoan, _minDuration, _maxInterest) public returns (result) {
// 	}

// 	function viewBids (_NFTListingAddress) public returns (LoanBids[]) {
// 		makeBidsArray(_NFTListingAddress);
// 		// Call the mapping and return the bids;
// 	}

// 	// accept loans
// 	// require to be owner or authorized;
// 	// 	=> (optional) require auction to be over 
// 	function acceptLoan (_NFTListingIndex, _loanIndex) public returns (loan) {
// 		endAuction();
// 		executeLoan(_NFTListingIndex, _loanIndex);
// 		// set executed to true;
// 	}
// }
