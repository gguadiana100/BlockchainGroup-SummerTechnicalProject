const BlindAuction = artifacts.require("BlindAuction");
const P2PLoan = artifacts.require("P2PLoan");
const NFTManager = artifacts.require("NFTManager");

module.exports = function(deployer) {
  // deployer.deploy(BlindAuction);
  deployer.deploy(P2PLoan);
  deployer.deploy(NFTManager)
};
