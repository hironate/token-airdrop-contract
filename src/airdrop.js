const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('../build/contracts/Airdrop.json');
const fs = require('fs');
const csv = require('@fast-csv/parse');
const mnemonicPhrase = fs.readFileSync("../.secret").toString().trim();

let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

let BATCH_SIZE = 1000;
let distribData = new Array();
let allocData = new Array();

async function readFile() {
  var stream = fs.createReadStream('airdrop.csv');
  let index = 0;
  let batch = 0;

  var csvStream = csv.parseStream(stream)
    .on("data", function(data) {
      let isAddress = web3.utils.isAddress(data[0]);
      if (isAddress && data[0] != null && data[0] != '') {
        allocData.push(data[0]);

        index++;
        if (index >= BATCH_SIZE) {
          distribData.push(allocData);
          allocData = [];
          index = 0;
        }
      }
    })
    .on("end", function() {
      //Add last remainder batch
      distribData.push(allocData);
      allocData = [];
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      airDrop();
    });

  stream.pipe(csvStream);
}

let myContract;

const init3 = async () => {

  let provider = new Provider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
  });

  web3 = new Web3(provider);
  //const networkId = await web3.eth.net.getId();
  myContract = new web3.eth.Contract(
    MyContract.abi,
    '0x342350D22e9312f55e37C52067DD6641c7a2C094'
  );

}

const airDrop = async () => {

  await init3();
  let accounts = await web3.eth.getAccounts();

  console.log('From Airdrop', await myContract.methods.owner().call());
  for (var i = 0; i < distribData.length; i++) {
    let gPrice = 50000000000;
    try {
      console.log('Airdrop started')
      let r = await myContract.methods.dropTokens(distribData[i], '1000000000000000000000').send({ from: accounts[0], gas: 4500000, gasPrice: gPrice });
      console.log('------------------------')
      console.log("Allocation + transfer was successful.", r.gasUsed, "gas used. Spent:", r.gasUsed * gPrice, "wei");
      break;
    } catch (err) {
      console.log(err);
    }

  }

}

//init3();
readFile();
