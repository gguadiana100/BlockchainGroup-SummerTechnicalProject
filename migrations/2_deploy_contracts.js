const BlindAuction = artifacts.require("BlindAuction");
const P2PLoan = artifacts.require("P2PLoan");
const NFTManager = artifacts.require("NFTManager");
const NFTMarketplace = artifacts.require("NFTMarketplace");

module.exports = function(deployer) {
  // deployer.deploy(BlindAuction);
  deployer.deploy(P2PLoan);
  deployer.deploy(NFTManager);
  deployer.deploy(NFTMarketplace);
};