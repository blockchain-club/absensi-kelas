import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      accounts: {
        initialIndex: 0,
        count: 10,
        path: "m/44'/60'/0'/0",
        passphrase: "",
        mnemonic: "test test test test test test test test test test test junk",
        accountsBalance: "10000000000000000000000",
      }
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    artifacts: "./build",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  typechain: {
    outDir: "./build/types",
    target: "ethers-v5",
  },
};

export default config;