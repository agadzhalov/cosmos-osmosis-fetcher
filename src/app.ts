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

    const latestBlockHeight = queryResult.block?.header?.height.toString();

    const hashBytes64 = queryResult.blockId?.hash;
    const latestBlockHash = Buffer.from(hashBytes64!).toString('hex').toUpperCase();;

    console.log(latestBlockHash, latestBlockHeight)
}

fetchFromOsmosis();