require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "http://goerli.example"
const PRIV_KEY = process.env.META_PRIV_KEY || "key"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COIN_API_KEY = process.env.COIN_API_KEY || "key"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.8" },
      { version: "0.6.0" },
      { version: "0.7.0" },
    ],
  },

  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      chainId: 5,
      url: GOERLI_RPC_URL,
      accounts: [PRIV_KEY],
      blockConfirmations: 6,
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
    user_01: {
      default: 1,
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  gasReporter: {
    enabled: true,
    outputFile: "gasReport.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COIN_API_KEY,
    token: "MATIC", // to get the price on POLYGON
  },
}
