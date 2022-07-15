import { ethers } from "ethers";
import { Address } from "cluster";
import { getEnvConfig } from "./utils/config";
import { squidImmutablesAbi } from "./config/squid-abi";
import { createTradeData } from "./utils/contract";

let env: string = "local";

const destChain: string = "avalanche";
const recipientAddress: string = "0x5F88eC396607Fc3edb0424E8E6061949e6b624e7";
const symbol: string = "aUSDC";
const sendAmount: any = ethers.utils.parseUnits("1", 18);

async function main(
  _env: string,
  _destChain: string,
  _recipientAddress: string,
  _symbol: string
) {
  console.log("--- starting script");
  const config = getEnvConfig(_env);
  //console.log('config is:', config)
  const provider = new ethers.providers.JsonRpcProvider(config?.rpcEth);
  const signer = new ethers.Wallet(config?.wallet || "", provider);
  const squidContractWithSigner = new ethers.Contract(
    config?.squidContractAddress || "",
    squidImmutablesAbi,
    signer
  );

  //todo - workout what this does and simplify
  const path = [
    "0x2C2D49edf7f69B0bd722E3298cc652b59878FD41",
    "0x8Ea02b04449d30Ebd47dbd4b4AfB21908743a195",
  ];
  //const destChain = useAppSelector(selectDestChain);
  //const destToken = useAppSelector(selectDestToken) as Token;
  //const srcTokenAtDestChain = useCrosschainToken(destChain, srcToken) as Token;
  //const path = getPath(srcTokenAtDestChain.address, destChain.wrappedNativeToken, destToken.address)

  const srcTradeData: string = createTradeData(
    path,
    config?.uniRouterAddress || "",
    config?.swapExecutorAddress || "",
    sendAmount
  );

  const result = await (
    await squidContractWithSigner.tradeSend(
      _destChain,
      _recipientAddress,
      _symbol,
      srcTradeData
    )
  ).wait();
  console.log("printing restult of tradeSend:", result);

  const txHash = result.transactionHash;
  console.log("transaction hash:", txHash);
}

main(env, destChain, recipientAddress, symbol);
