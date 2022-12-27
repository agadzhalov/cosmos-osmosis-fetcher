import { ProtobufRpcClient } from "@cosmjs/stargate";
import { QueryClientImpl } from "../../proto/dest/osmosis/gamm/v1beta1/query";

class NumPools {
    private rpcClient: ProtobufRpcClient;
    private osmosisService: QueryClientImpl;

    constructor(_rpcClient: ProtobufRpcClient) {
        this.rpcClient = _rpcClient;
        this.osmosisService = new QueryClientImpl(this.rpcClient);
    }

    public async fetchNumPools(): Promise<string> {
        const osmosisQueryResult = await this.osmosisService.NumPools({});
        const numPools = osmosisQueryResult.numPools.toString();

        return numPools;
    }
}

export default NumPools;