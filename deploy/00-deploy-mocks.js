const { network } = require("hardhat")
const {
  developmentChains,
  DECIMALS,
  INIT_ANSWER,
} = require("../hardhat_helper_config")

module.exports = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  if (developmentChains.includes(network.name)) {
    // network.name relates to const developmentChains = ["hardhat", "localhost"] in hh_helper_config
    log("--------------")
    log("Local network detected, Deploying Mocks")
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      args: [DECIMALS, INIT_ANSWER], // uint8 _decimals, int256 _initialAnswer
      log: true,
    })
    log("Mocks deployed.")
    log("--------------")
  }

  // to be able to deploy ONLY our mock by running: "yarn hardhat deploy --tags mocks"
  module.exports.tags = ["all", "mocks"]
}
