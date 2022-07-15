import axios from "axios";
import { Address } from "cluster";
import { debug } from "console";
import { ethers } from "ethers";
import routerAbi from "./utils/router.json";

const sendAmount: string = "10000000000000000";
const aUSDC: string = "10000000";

const tradeSendUrl: string = `http://localhost:3000/api/transaction?recipientAddress=0x5F88eC396607Fc3edb0424E8E6061949e6b624e7&srcChain=ethereum&srcTokenIn=WETH&srcInAmount=${sendAmount}&dstChain=avalanche&dstTokenOut=aUSDC&slippage=1`;
const tradeSendTradeUrl: string = `http://localhost:3000/api/transaction?recipientAddress=0x5F88eC396607Fc3edb0424E8E6061949e6b624e7&srcChain=ethereum&srcTokenIn=WETH&srcInAmount=${sendAmount}&dstChain=avalanche&dstTokenOut=WAVAX&slippage=1`;
const sendTradeUrl: string = `http://localhost:3000/api/transaction?recipientAddress=0x5F88eC396607Fc3edb0424E8E6061949e6b624e7&srcChain=ethereum&srcTokenIn=aUSDC&srcInAmount=${aUSDC}&dstChain=avalanche&dstTokenOut=WAVAX&slippage=1`;

async function main() {
  console.log("starting script");
  console.log("before api call");
  const response = await axios.get(sendTradeUrl);
  console.log("after api call");

  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8500/2"
  );

  const signer = new ethers.Wallet(
    "86e04a5bc443e94b64883f5ba70f7dd4d083606ce49a43e171d2bde4d39be36d",
    provider
  );
  const squidAddress = "0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7";
  const squidImmutablesAbi = [
    "function tradeSend(string memory destinationChain, string memory destinationAddress, string memory symbol, bytes memory tradeData) external payable",
    "function tradeSendTrade(string memory destinationChain,string memory symbol, bytes memory tradeData1, bytes memory tradeData2,bytes32 traceId, address fallbackRecipient,uint16 inputPos) external payable",
    "function sendTrade(string memory destinationChain, string memory symbol, uint256 amount, bytes memory tradeData, bytes32 traceId, address fallbackRecipient, uint16 inputPos) external payable",
  ];

  const squidContractWithSigner = new ethers.Contract(
    squidAddress,
    squidImmutablesAbi,
    signer
  );

  if (response!.data.data.routeType === "TRADE_SEND") {
    let tradeSend = response!.data.data.tradeSend;
    console.log(response!.data.data.routeType);
    const tradeSendResult = await squidContractWithSigner.tradeSend(
      tradeSend.dstChainName,
      tradeSend.recipientAddress,
      tradeSend.crossChainToken,
      tradeSend.srcTradeData
    );
    const txId = (await tradeSendResult.wait(1)).transactionHash;
  } else if (response!.data.data.routeType === "TRADE_SEND_TRADE") {
    let tradeSendTrade = response!.data.data.tradeSendTrade;
    console.log(response!.data.data.routeType);
    squidContractWithSigner.tradeSendTrade(
      tradeSendTrade.dstChainName,
      tradeSendTrade.crossChainToken,
      tradeSendTrade.srcTradeData,
      tradeSendTrade.destTradeData,
      tradeSendTrade.traceId,
      tradeSendTrade.recipientAddress,
      tradeSendTrade.AMOUNT_INPUT_POS,
      tradeSendTrade.value
    );
  } else if (response!.data.data.routeType === "SEND_TRADE") {
    let sendTrade = response!.data.data.sendTrade;
    console.log(response!.data.data.routeType);
    squidContractWithSigner.sendTrade(
      sendTrade.dstChainName,
      sendTrade.srcTokenSymbol,
      aUSDC,
      sendTrade.destTradeData,
      sendTrade.traceId,
      sendTrade.recipientAddress,
      sendTrade.AMOUNT_INPUT_POS,
      sendTrade.value
    );
  }
}
main();
