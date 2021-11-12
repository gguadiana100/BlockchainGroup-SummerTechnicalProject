require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // change this to deploy to testnet/mainnet 
  // currently links to local blockchain on ganache
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }, 
    rinkeby: {
       provider: () => new HDWalletProvider(`YOUR_SEED_PHRASE`, `https://rinkeby.infura.io/v3/b63bffeec2e545f2a3e9b3e9423d6180`),
       network_id: 4,       // Ropsten's id
       gas: 5500000,        // Ropsten has a lower block limit than mainnet
       confirmations: 2,    // # of confs to wait between deployments. (default: 0)
       timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
       skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }, // truffle migrate --network rinkeby
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.4"
    }
  }
}
