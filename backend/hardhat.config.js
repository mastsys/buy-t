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
      url: process.env.GOERLI_URL,
      accounts: [`0x${process.env.GOERLI_PRIVATE_KEY}`],
    }
  }
};
