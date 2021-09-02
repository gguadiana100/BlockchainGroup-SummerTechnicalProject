const BlindAuction = artifacts.require("BlindAuction");
const P2PLoan = artifacts.require("P2PLoan");

module.exports = function(deployer) {
  deployer.deploy(BlindAuction);
  deployer.deploy(P2PLoan);
};
