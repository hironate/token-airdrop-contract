# Auto Airdrop Smart Contract for binance smart chain and Ethereum

I have been across many DAPPs to Airdrop Tokens. I found that DAPPs are charging way more to just privide airdrop services. This smart contract and airdrop.js code will help you to deploy your BSC/Ethereum Tokens without costing you extra money.

### Micro Documentation
we are using truffle framework for smart contract development and deployment. For auto airdrop we are using node.js script with web3.js for smart contract interation.

#### Files and usage
##### contracts/Airdrop.sol
This is our Main Contract file which you need to deploy. You can customize contract as per your requirement.

##### migrations/1_initial_migration.js
Our Smart contract takes 1 constructor parameter, You need to pass Token Contract Address which you want to Airdrop. That you can specify in this file.

##### src/airdrop.csv
List of Addresses you want to airdrop tokens to. (Sample file included, you can also download list from bscscan,etherscan)

##### src/airdrop.js
This is a node script to interect with deployed airdrop smart contract. it reads list of airdrop beneficiaries and airdrops token in batch size you have specified. in ```init3``` function you need to specify deployed smart contract address.

##### .secret
File which contains 12 secret mnemonic phrases of your hd wallet.

#### Commands to deploy and airdrop

##### Deploy smart contact
 - ```npm install```
 - Copiling smart contract ```truffle compile```
 - Deploying smart contract - ```truffle migrate --network=testnet``` Choose network from ```truffle-config.js``` file.
 - Verify smart contract on bscscan/etherscan (API Keys are needed)- ```truffle run verify Airdrop@{ContractAddress} --network testnet```
 - Once smart contract is deployed and verified, you can interect it from bscscan/etherscan

##### Allowance
 - Set Allowance in your Token Contract, so Airdrop contract can transfer tokens.

##### Token Airdrop
 - Goto src directory
 - Run ```node airdrop.js```
 - Done Script will start airdroping tokens. Dont forget to set gas price you want and maintain balance into your wallet.

## Authors

* Hiren Kavad

## License

This bundle is dual-licensed under MIT and GPL licenses.

* [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
* [http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)

Use it, change it, fork it, sell it. Do what you will, but please leave the author attribution.

