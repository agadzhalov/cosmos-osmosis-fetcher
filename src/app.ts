import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import LatestBlock from "./app/LatestBlock";
import NumPools from "./app/NumPools";

class App {
    constructor() {}

    public async run () {
        const tendermintClient = await Tendermint34Client.connect("https://rpc.osmosis.zone:443");
        const queryClient = new QueryClient(tendermintClient);
        const rpcClient = createProtobufRpcClient(queryClient);
    
        const latestBlock = new LatestBlock(rpcClient);
        const numPools = new NumPools(rpcClient);
        
        console.log(await latestBlock.fetchBlockHeigth());
        console.log(await latestBlock.fetchBlockHash());
        console.log(await numPools.fetchNumPools());
    }

}

export default App;