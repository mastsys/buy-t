require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {

    },
    ganache: {
      url: "http://127.0.0.1:9545"
    },
    goerli: {
      //url: "https://eth-goerli.g.alchemy.com/v2/Tq__YuHi-Fguvz3vmXoj9Vk-qSNXprqd",
      url: process.env.GOERLI_URL,
      accounts: [`0x${process.env.GOERLI_PRIVATE_KEY}`],
      //accounts: [`0xad24224f680c56d5cd87b06892661b8cf6b0dcdedf905d16d8c8ff1bed466f41`],
    }
  }
};
