import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ServiceClientImpl } from "./../proto/dest/cosmos/base/tendermint/v1beta1/query";
import { base64ToHex } from "./utils/Helper";

const fetchFromOsmosis = async () => {
    const tendermintClient = await Tendermint34Client.connect("https://rpc.osmosis.zone:443");
    const queryClient = new QueryClient(tendermintClient);
    const rpcClient = createProtobufRpcClient(queryClient);
    const queryService = new ServiceClientImpl(rpcClient);    
    const queryResult = await queryService.GetLatestBlock({});
    const hash = queryResult.blockId?.hash;
    if (hash) {
        const b64 = Buffer.from(hash).toString('base64');
        console.log(base64ToHex(b64));
    }
   
}

fetchFromOsmosis();