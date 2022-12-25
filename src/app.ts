import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ServiceClientImpl } from "./../proto/dest/cosmos/base/tendermint/v1beta1/query";
import { QueryClientImpl } from "./../proto/dest/osmosis/gamm/v1beta1/query";

const fetchFromOsmosis = async () => {
    const tendermintClient = await Tendermint34Client.connect("https://rpc.osmosis.zone:443");
    const queryClient = new QueryClient(tendermintClient);
    const rpcClient = createProtobufRpcClient(queryClient);

    /**
     * Tendermint LatestBlock
     */
    const queryService = new ServiceClientImpl(rpcClient);

    const queryResult = await queryService.GetLatestBlock({});

    const latestBlockHeight = queryResult.block?.header?.height.toString();

    const hashBytes64 = queryResult.blockId?.hash;
    const latestBlockHash = Buffer.from(hashBytes64!).toString('hex').toUpperCase();;

    console.log(latestBlockHash, latestBlockHeight);

    /**
     * Osmosis Num Pools
     */
    const osmosisQueryService = new QueryClientImpl(rpcClient);
    const osmosisQueryResult = await osmosisQueryService.NumPools({});
    console.log(osmosisQueryResult);
    
}

fetchFromOsmosis();