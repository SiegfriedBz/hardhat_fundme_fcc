const { run } = require("hardhat")

async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  // with { ethers, run } = require("hardhat")
  //// we can RUN every hardhat available TASK (check yarn hardhat to see available TASKS)
  ///// here verify sub-task of the verify task, + address + args
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
    console.log("Contract EtherScan Verification Successfull")
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("contract already verified")
    } else {
      console.log(error)
    }
  }
}

module.exports = {
  verify,
}
