// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./NFTManager.sol";

contract NFTMarketplace is IERC721Receiver {

    struct NFT {
        address nft_contract;
        uint256 token_id;
    }

    //original owner -->  nft(contract address, token_id)
    mapping(address => NFT) public NFT_list;

    //check if the address is a contract address
    function isContract(address _addr) public view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }

    // for NFT minted on our own platform - NFTManager

    // LockNFT(address contractAddess, uint256 token_id)
    function lockNFT(address _addressNFTManager, uint256 _token_id) external returns (bool) {
        require(
            isContract(_addressNFTManager),
            "Invalid NFT Collection contract address"
        );
        // get the NFT contract
        NFTManager nftManager = NFTManager(_addressNFTManager);
        // caller is the owner of the NFT
        require(
            nftManager.ownerOf(_token_id) == msg.sender,
            "Caller is not the owner of the NFT"
        );
        // the owner of the NFT approved that the MarketPlace contract
        // is allowed to change ownership of the NFT
        require(
            nftManager.getApproved(_token_id) == address(this),
            "Require NFT ownership transfer approval"
        );
        // Lock NFT in Marketplace contract
        nftManager.transferNFTFrom(msg.sender, address(this), _token_id);
        // add to the master list
        NFT_list[msg.sender] = NFT(_addressNFTManager,_token_id);
        return true;
    }

    //UnLockNFT(address contractAddess, uint256 token_id)
    function unlockNFT(address _addressNFTManager, uint256 _token_id, address send_to) external{
        require(
            isContract(_addressNFTManager),
            "Invalid NFT Collection contract address"
        );
        // get the NFT contract
        NFTManager nftManager = NFTManager(_addressNFTManager);
        nftManager.transferNFTFrom(address(this), send_to ,_token_id);
    }


    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }


}