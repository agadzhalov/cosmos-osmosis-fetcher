import { ProtobufRpcClient } from "@cosmjs/stargate";
import { QueryClientImpl } from "../../proto/dest/osmosis/gamm/v1beta1/query";

/**
 * Uses cosmjs to fetch num pools
 * 
 * @param _rpcClient a protobuf RPC client
 * @author Alexander Gadzhalov
 */
class NumPools {
    private rpcClient: ProtobufRpcClient;
    private osmosisService: QueryClientImpl;

    constructor(_rpcClient: ProtobufRpcClient) {
        this.rpcClient = _rpcClient;
        this.osmosisService = new QueryClientImpl(this.rpcClient);
    }

    /**
     * Fetches numPools
     * @returns numPools string
     */
    public async fetchNumPools(): Promise<string> {
        const osmosisQueryResult = await this.osmosisService.NumPools({});
        const numPools = osmosisQueryResult.numPools.toString();

        return numPools;
    }
}

export default NumPools;