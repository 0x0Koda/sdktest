import { ethers, utils } from "ethers";
import { Address } from "cluster";
import { parseEther, parseUnits } from "ethers/lib/utils";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8500/2"
  );

  const signer = new ethers.Wallet(
    "86e04a5bc443e94b64883f5ba70f7dd4d083606ce49a43e171d2bde4d39be36d",
    provider
  );
  console.log("------------- signer:", signer);

  let abi = [
    "function approve(address _spender, uint256 _value) public returns (bool success)",
  ];
  //let provider = ethers.getDefaultProvider("ropsten");

  let contract = new ethers.Contract(
    "0x2C2D49edf7f69B0bd722E3298cc652b59878FD41",
    abi,
    signer
  );
  await contract.approve(
    "0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7",
    parseUnits("1", 18)
  );
}

main();
