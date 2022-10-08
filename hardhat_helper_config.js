const networkConfig = {
  5: {
    // chainId
    name: "goerli",
    ethUsdPriceFeedAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  80001: {
    // chainId
    name: "polygon mumbai",
    ethUsdPriceFeedAddress: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
  },
}

// For Tests / Mocks
const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INIT_ANSWER = 100000000000 // 1000' with 8 decimals added

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INIT_ANSWER,
}
