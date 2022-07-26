import { BigNumber, ethers, utils } from "ethers";
import { Address } from "cluster";
import { parseEther, parseUnits } from "ethers/lib/utils";

const WETHContractAddress: string = "0x2C2D49edf7f69B0bd722E3298cc652b59878FD41"
const aUSDContractAddress: string = "0x8Ea02b04449d30Ebd47dbd4b4AfB21908743a195"
//const WAVAXContractAddress: string = "0x2C2D49edf7f69B0bd722E3298cc652b59878FD41"

const ethRpcEndPoint: string = "http://localhost:8500/2"
const avaxRpcEndPoint: string = "http://localhost:8500/1"
const mbeamRpcEndPoint: string = "http://localhost:8500/0"

const wethApprovalAmmont: BigNumber = parseUnits("100", 18)
const ausdcApprovalAmmont: BigNumber = parseUnits("100", 6)

const privateKey: string = "86e04a5bc443e94b64883f5ba70f7dd4d083606ce49a43e171d2bde4d39be36d"
const squidContractAddress: string = "0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7"


async function approveToken(_tokenAddress: string, _rpc: string, _approvalAmount: BigNumber) {
  const provider = new ethers.providers.JsonRpcProvider(
    _rpc
  );

  const signer = new ethers.Wallet(
    privateKey,
    provider
  );
  // token contract abi
  const abi = [
    "function approve(address _spender, uint256 _value) public returns (bool success)",
  ];

  const contract = new ethers.Contract(
    WETHContractAddress,
    abi,
    signer
  );
  await contract.approve(
    squidContractAddress,
    _approvalAmount
  );
}

async function main() {
  console.log('approving weth on eth')
  await approveToken(WETHContractAddress, ethRpcEndPoint, wethApprovalAmmont);
  console.log('approving ausdc on eth')
  await approveToken(aUSDContractAddress, ethRpcEndPoint, ausdcApprovalAmmont);
}
main()


