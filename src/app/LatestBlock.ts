import { ProtobufRpcClient } from "@cosmjs/stargate";
import { ServiceClientImpl } from "../../proto/dest/cosmos/base/tendermint/v1beta1/query";

class LatestBlock {
    private rpcClient: ProtobufRpcClient;
    private service: ServiceClientImpl;

    constructor(_rpcClient: ProtobufRpcClient) {
        this.rpcClient = _rpcClient;
        this.service = new ServiceClientImpl(this.rpcClient);
    }

    public async fetchBlockHeigth(): Promise<string> {
        const queryResult = await this.service.GetLatestBlock({});
        const latestBlockHeight = queryResult.block?.header?.height.toString();

        return latestBlockHeight!;
    }

    public async fetchBlockHash(): Promise<string> {
        const queryResult = await this.service.GetLatestBlock({});
        const hashBytes64 = queryResult.blockId?.hash;
        const latestBlockHash = Buffer.from(hashBytes64!).toString('hex').toUpperCase();

        return latestBlockHash;
    }
}

export default LatestBlock;