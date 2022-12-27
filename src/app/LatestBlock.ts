import { ProtobufRpcClient } from "@cosmjs/stargate";
import { ServiceClientImpl } from "../../proto/dest/cosmos/base/tendermint/v1beta1/query";

/**
 * Uses cosmjs to read information for the latest block from a given GRPC Endpoint.
 * 
 * @param rpcClient a protobuf RPC client
 * @author Alexander Gadzhalov
 */
class LatestBlock {
    private rpcClient: ProtobufRpcClient;
    private service: ServiceClientImpl;

    constructor(_rpcClient: ProtobufRpcClient) {
        this.rpcClient = _rpcClient;
        this.service = new ServiceClientImpl(this.rpcClient);
    }

    /**
     * Fetches height of the latest block
     * @returns height string
     */
    public async fetchBlockHeigth(): Promise<string> {
        const queryResult = await this.service.GetLatestBlock({});
        const latestBlockHeight = queryResult.block?.header?.height.toString();

        return latestBlockHeight!;
    }

    /**
     * Fetches latest block's hash in base64 and converts it to hex
     * @returns hash string
     */
    public async fetchBlockHash(): Promise<string> {
        const queryResult = await this.service.GetLatestBlock({});
        const hashBytes64 = queryResult.blockId?.hash;
        const latestBlockHash = Buffer.from(hashBytes64!).toString('hex').toUpperCase();

        return latestBlockHash;
    }
}

export default LatestBlock;