import { ethers } from "ethers";
import { Address } from "cluster";

async function main() {
  console.log("--------- Enter main function");
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  //console.log(provider);

  const greeterAbi = [
    "function greet() public view returns (string memory)",
    "function setGreeting(string memory _greeting) public",
  ];

  const signer = provider.getSigner();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = new ethers.Contract(contractAddress, greeterAbi, signer);
  //const txsGreet = await contract.greet();
  //console.log("greet txs:", txsGreet);

  let iface = new ethers.utils.Interface(greeterAbi);
  const what = await iface.encodeFunctionData("setGreeting", ["cccssssblah"]);

  //const nonce = await wallet.getTransactionCount()

  let wallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const tx = {
    to: contractAddress,
    //value: 0,
    data: what,
    //chainId: 31337,
  };
  let resp = await wallet.signTransaction(tx);
  const sentTxResponse = await wallet.sendTransaction(tx);
  console.log(resp);

  const txsGreet = await contract.greet();
  console.log("greet txs:", txsGreet);

  //console.log(what);
}
main();
/* 
iface.encodeFunctionData("transferFrom", [
  "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  "0xaB7C8803962c0f2F5BBBe3FA8bf41cd82AA1923C",
  parseEther("1.0"),
]);
 */
