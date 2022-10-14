import {
  AxelarQueryAPI,
  AxelarQueryAPIConfig,
} from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";

const main = async () => {
  const sdk = new AxelarQueryAPI({
    environment: "mainnet",
  } as AxelarQueryAPIConfig);

  const fee = await sdk.getTransferFee(
    "Moonbeam",
    "Ethereum",
    "uusdc",
    10000000000000
  );

  console.log(fee);
  console.log(Number(ethers.utils.parseEther("1")));
};

main();
