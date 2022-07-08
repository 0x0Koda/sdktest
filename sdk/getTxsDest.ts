import { ethers } from "ethers";
import erc20Abi from "./utils/erc20.json";

async function main(_recipientAddress: string) {
  // wait for TransferEvent
  const destProvider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8500/1"
  );

  const erc20Contract = new ethers.Contract(
    "0x76a1d316A87BCCa8fC3d091055fD3e6c89430652",
    erc20Abi,
    destProvider
  );
  const eventFilter = erc20Contract.filters.Transfer(
    ethers.constants.AddressZero,
    _recipientAddress
  );

  erc20Contract.on(eventFilter, (...args) => {
    //console.log(args);
    //args.forEach((arg) => {
    //});
    const txHash = args[args.length - 1].transactionHash;
    console.log("txhash is:", txHash);
  });
}

main("0x5F88eC396607Fc3edb0424E8E6061949e6b624e7");
