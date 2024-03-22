// hardhat.config.ts

import "dotenv/config"
import "@nomiclabs/hardhat-solhint"
import "@nomiclabs/hardhat-waffle"
import "hardhat-abi-exporter"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "hardhat-gas-reporter"
import "hardhat-spdx-license-identifier"
import "hardhat-typechain"
import "hardhat-watcher"
import "solidity-coverage"
import "./tasks"

import { HardhatUserConfig } from "hardhat/types"
import { removeConsoleLog } from "hardhat-preprocessor"

declare var process : {
  env: {
    DEPLOYER_PRIVATE_KEY: string,
    DEV_PRIVATE_KEY: string,
    TESTER_PRIVATE_KEY: string,
    COINMARKETCAP_API_KEY: string,
    REPORT_GAS: string,
    FORKING: string,
  }
}

const myAccounts = [process.env.DEPLOYER_PRIVATE_KEY, process.env.DEV_PRIVATE_KEY, process.env.TESTER_PRIVATE_KEY]

const config: HardhatUserConfig = {
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  defaultNetwork: "hardhat",
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS === "true",
    excludeContracts: ["contracts/mocks/", "contracts/libraries/"],
  },
  mocha: {
    timeout: 20000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      // Default to 1
      default: 1,
      // dev address mainnet
      // 1: "",
    },
    tester: {
      default: 2,
    },
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ["local"],
    },
    hardhat: {
      forking: {
        enabled: process.env.FORKING === "true",
        url: `https://rpc01-sg.dogechain.dog`,
        blockNumber: 920398,
      },
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    dogechain: {
      url: "https://rpc01-sg.dogechain.dog",
      // url: "https://rpc02-sg.dogechain.dog",
      accounts: myAccounts,
      chainId: 2000,
      live: true,
      saveDeployments: true,
      gasMultiplier: 2,
    },
    "dogechain-testnet": {
      url: "https://rpc-testnet.dogechain.dog",
      accounts: myAccounts,
      chainId: 568,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  preprocess: {
    eachLine: removeConsoleLog((bre) => bre.network.name !== "hardhat" && bre.network.name !== "localhost"),
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },

    outDir: "types",
    target: "ethers-v5",
  },
  watcher: {
    compile: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
  },
}

export default config
