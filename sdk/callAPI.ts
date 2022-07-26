import axios from "axios";
import { Address } from "cluster";
import { debug } from "console";
import { BigNumber, BytesLike, ethers } from "ethers";
import squidAbi from "./utils/squidAbi.json";

const sendAmount: BigNumber = ethers.utils.parseEther('0.1'); //0.1 WETH
const aUSDC: BigNumber = ethers.utils.parseUnits("20", 6); // 1 aUSDC

const tradeSendUrl: string = `http://localhost:3000/api/transaction?recipientAddress=0x5F88eC396607Fc3edb0424E8E6061949e6b624e7&srcChain=ethereum&srcTokenIn=WETH&srcInAmount=${sendAmount}&dstChain=avalanche&dstTokenOut=aUSDC&slippage=1`;
const tradeSendTradeUrl: string = `http://localhost:3000/api/transaction?recipientAddress=0x5F88eC396607Fc3edb0424E8E6061949e6b624e7&srcChain=ethereum&srcTokenIn=WETH&srcInAmount=${sendAmount}&dstChain=avalanche&dstTokenOut=WAVAX&slippage=1`;
const sendTradeUrl: string = `http://localhost:3000/api/transaction?recipientAddress=0x5F88eC396607Fc3edb0424E8E6061949e6b624e7&srcChain=ethereum&srcTokenIn=aUSDC&srcInAmount=${aUSDC}&dstChain=avalanche&dstTokenOut=WAVAX&slippage=1`;
const squidAddress: string = "0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7";
const privateKey: BytesLike = "0x86e04a5bc443e94b64883f5ba70f7dd4d083606ce49a43e171d2bde4d39be36d"

async function main(_url: string) {
  console.log("starting script");
  console.log('calling: ', _url)
  const response = await axios.get(_url);
  console.log('route type: ', response.data.routeType)

  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8500/2"
  );

  let wallet = new ethers.Wallet(
    privateKey,
    provider
  );

  //Construct transaction object with encoded data
  const tx: any = {
    to: squidAddress,
    data: response!.data.data,
    value: response!.data.gasReceiver ? BigInt(5e6) : null, //this will need to be calculated, maybe by the api
  };
  //sign and submit transaction
  let resp = await wallet.signTransaction(tx);
  const sentTxResponse = await wallet.sendTransaction(tx);
  const txReceipt = await sentTxResponse.wait(1);
  console.log(txReceipt);
}
main(sendTradeUrl)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });