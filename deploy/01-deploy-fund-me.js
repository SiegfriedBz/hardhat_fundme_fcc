const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../hardhat_helper_config")
const { verify } = require("../utils/verify")

module.exports = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts() // from config 'namedAccounts'
  const chainId = network.config.chainId

  // PriceFeed ChainLink AggregatorInterface address (pair && chain specific)
  let ethUsdPriceFeedAddress
  //* If there is no AggregatorInterface address specific for the chain we are workin on
  /// eg local hardhat network, then we can use
  //// a MOCK to make up a minimal PriceFeed contract for our tests
  if (developmentChains.includes(network.name)) {
    // check if local test network
    ethUsdPriceFeed = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdPriceFeed.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeedAddress"]
  }

  const args = [ethUsdPriceFeedAddress] // chain specific ETH / USD Address for ChainLink Aggregator
  const fundMe = await deploy("FundMe", {
    contract: "FundMe",
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // check if NOT local test network => verify on etherscan
    await verify(fundMe.address, args) // args == [//xxx//] : constructor arguments
  }
}

module.exports.tags = ["all", "fundme"]
