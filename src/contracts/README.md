<br />
<div align="center">
    <h3 align="center">Contract APIs</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#p2p-loan">P2P Loan</a>
      <ul>
        <li><a href="#execute-loan">Execute Loan</a></li>
      </ul>
    </li>
    <li>
      <a href="#example-contract">Example Contract</a>
      <ul>
        <li><a href="#example-section">Example Section</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#links">Links</a></li>
  </ol>
</details>



<!-- P2P LOAN -->
## P2P Loan
API list for p2ploan contract

### Execute Loan
1. creates a new loan instance 
  ```sh
   function createLoan( address _tokenAddress, uint _tokenID, uint _loanAmount,
    uint _interestRate, uint _loanCompleteTimeStamp ) external whenNotPaused 
  ```  
  ```sh
    {
      "returnValues": {
        "id": "1",
        "owner": "0x50...sd5adb20",
        "tokenId": "1",
        "tokenAddress": "0x50...sd5adb20",
        "loanAmount": "100",
        "interestRate": "1",
        "loanCompleteTimeStamp": "1970/01/01 00:00:00 UTC"
      },
      "raw": {...}
    }
  ```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- EXAMPLE CONTRACT -->
## Example Contract
example
### Example Section

Example api function
* function
  ```sh
  npm install npm@latest -g
  ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
* Testing
  ```sh
  truffle test ./test/test_file_name.js
  ```
* deploy
  ```sh
  truffle migrate --network rinkeby
  ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LINKS -->
## Links

Truffle Deploy - [https://www.geeksforgeeks.org/deploying-smart-contract-on-test-main-network-using-truffle/](https://www.geeksforgeeks.org/deploying-smart-contract-on-test-main-network-using-truffle/)

Truffle Test - [https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)

Subscribing to events - [https://betterprogramming.pub/learn-solidity-events-2801d6a99a92](https://betterprogramming.pub/learn-solidity-events-2801d6a99a92)

Docs on events - [https://docs.soliditylang.org/en/v0.8.0/contracts.html#events](https://docs.soliditylang.org/en/v0.8.0/contracts.html#events)

Solidity Modifiers - [https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)

<p align="right">(<a href="#top">back to top</a>)</p>

