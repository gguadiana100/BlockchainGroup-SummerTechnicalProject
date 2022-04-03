// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTMarketplace is IERC721Receiver {


    // global variables
    // nft id (contract address, token_id) -> original owner



    // for NFT minted on our own platform - NFTManager
     


    // LockNFT(address contractAddess, uint256 token_id)
    // check if contract address is valid
    // create an instance of the contract - NFTManager
    // use that instance to call transferFrom  - send the NFT to address(this)
    // nft id - > msg.sender (NFT owner)


    //UnLockNFT(address contractAddess, uint256 token_id)


    // for NFT minted on external contract 

    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }


}