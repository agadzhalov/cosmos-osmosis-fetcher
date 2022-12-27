import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import LatestBlock from "./app/LatestBlock";
import NumPools from "./app/NumPools";
import StateTracker from "./app/StateTracker";

class App {
    private endpoint: string;

    constructor(_endpoint: string) {
        this.endpoint = _endpoint;
    }

    public async run () {
        const tendermintClient = await Tendermint34Client.connect(this.endpoint);
        const queryClient = new QueryClient(tendermintClient);
        const rpcClient = createProtobufRpcClient(queryClient);
    
        const latestBlock = new LatestBlock(rpcClient);
        const numPools = new NumPools(rpcClient);
        const stateTracker = new StateTracker(latestBlock, numPools);

        console.log(await latestBlock.fetchBlockHeigth());
        console.log(await latestBlock.fetchBlockHash());
        console.log(await numPools.fetchNumPools());
        
        await stateTracker.runStateTracker()
    }

}

export default App;