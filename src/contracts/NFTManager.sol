// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTManager is ERC721URIStorage { 
    event returnTokenId(
        uint256 _tokenId
    );

    struct token{
        string Name;
        string URI;
        uint index;
    }

    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    constructor() ERC721("NFT Manager", "NFTM") {
    }

    token[] private NFTList;

    mapping(address => uint256[]) private balance;

    function createToken(string memory tokenURI, string memory _Name) public returns (uint256) {
        uint256 oldItemId = _tokenIds.current();
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        require(newItemId == oldItemId + 1, "not incrementing");
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        NFTList.push(token({Name: _Name, URI: tokenURI, index: newItemId}));
        balance[msg.sender].push(newItemId);
        // emit returnTokenId(newItemId);
        return newItemId;
    }
    function getLatestId() view public returns (uint256){
        return _tokenIds.current();
    }
    function getAddr() view public returns (address){
        return address(this);
    }
    function getUserNFTs() public view returns (uint256[] memory) {
        return balance[msg.sender];
    }
    function transferNFTFrom(address from, address to, uint256 tokenId) public virtual returns (bool) {
        if (ownerOf(tokenId) == msg.sender) {
            safeTransferFrom(msg.sender, to, tokenId);
            return true;
        } else {
            revert("Transfer Not Successful - unknown");
            
        }
    }

}
