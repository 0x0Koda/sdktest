import * as dotenv from "dotenv";

import { extendEnvironment, HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-ethernal";
import hre from "hardhat";
//import hre from "hardhat";


dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
        //["86e04a5bc443e94b64883f5ba70f7dd4d083606ce49a43e171d2bde4d39be36d"]
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },  
};

module.exports = {
  solidity: "0.8.0",
  ethernal: {
    email: "devperson03@gmail.com",
    password: "Blag333#",
      disableSync: false, // If set to true, plugin will not sync blocks & txs
      disableTrace: false, // If set to true, plugin won't trace transaction
      workspace: undefined, // Set the workspace to use, will default to the default workspace (latest one used in the dashboard). It is also possible to set it through the ETHERNAL_WORKSPACE env variable
      uploadAst: true, // If set to true, plugin will upload AST, and you'll be able to use the storage feature (longer sync time though)
      disabled: false, // If set to true, the plugin will be disabled, nohting will be synced, ethernal.push won't do anything either
      resetOnStart: true // Pass a workspace name to reset it automatically when restarting the node, note that if the workspace doesn't exist it won't error
  }
};
/* 
module.exports = {
  ethernal: {
    email: "devperson03@gmail.com",
    password: "Blag333#",
}
}; */

export default config;
