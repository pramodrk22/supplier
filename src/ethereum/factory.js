import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
import { ethers } from 'ethers';



const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x46F82554817E021E169D8d4410A35E5820D28e13"
);
//  const provider = new ethers.providers.Web3Provider(window.ethereum)
// //   const keepersContract = new ethers.Contract(keepersContractAddress, keeperContractABI, provider);

// const instance = new ethers.Contract("0xdB57A43111b1f6FaE4087F93d29Cf1aE1728d8F1",CampaignFactory.abi,provider);

export default instance;
