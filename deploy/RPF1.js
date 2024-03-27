 module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()


  await deploy("RPF", {
    from: deployer,
    args: ["RPF1", "RPF1", "1"],
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["RPF1"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
