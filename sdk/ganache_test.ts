import { ethers } from "ethers";

const main = async () => {
  console.log("--------- Enter main function");
  const provider = new ethers.providers.JsonRpcProvider(
    //"https://hostedfork-ae63c22efbe88127.elb.ap-southeast-2.amazonaws.com/0"
    //"http://ec2-13-238-4-52.ap-southeast-2.compute.amazonaws.com:8500/0"
    //"https://test-753005072.ap-southeast-2.elb.amazonaws.com/0"
    "https://test3-1648527617.ap-southeast-2.elb.amazonaws.com/0"
  );
  //console.log(provider);

  const signer = provider.getSigner();

  const balance = await provider.getBalance(
    "0x487A5ac4555039cD10365B10588fd47e6bf110E7"
  );
  console.log(balance.toString());
};

main();
