import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x29428806937960F0DE00d10ba2Bf3736a8B8A44c"
);

export default instance;
