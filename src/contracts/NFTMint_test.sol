// SPDX-License-Identifier: GPL 3
// Peter's Test File Mar 01
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTCollection is ERC721URIStorage {
    
    struct token{
        string Name;
        string URI;
        uint index;
    }

    constructor() ERC721("NFTCollection1", "$nft") {}

    token[] private NFTList;

    mapping(address => uint256[]) private balance;

    function mint (string memory _name, string memory _URI) public returns (uint256) {
        uint mintIndex;

        if (NFTList.length == 0){
            mintIndex = 0;
        } else {
            mintIndex = NFTList.length - 1;
        }

        _safeMint(msg.sender, mintIndex);

        _setTokenURI(mintIndex, _URI);

        NFTList.push(token({Name: _name, URI: _URI, index: mintIndex}));

        balance[msg.sender].push(mintIndex);

        return mintIndex;
    }

    function getUserNFTs() public view returns (uint256[] memory) {
        return balance[msg.sender];
    }

    function transferToken (address sender, address receiver, uint tokenIndex) public returns (bool){
        safeTransferFrom(sender, receiver, tokenIndex);
        if (ownerOf(tokenIndex) == receiver) {
            return true;
        } else {
            revert("Transfer Not Successful - unknown");
        }
    }
}