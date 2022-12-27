import LatestBlock from "./LatestBlock";
import NumPools from "./NumPools";
/**
 * Blockchain statetracker for the latest block
 * 
 * @param latestBlock instance of LatastBlock class for fetching block height
 * @param numPools instance of NumPools class for fetching num pools
 * @author Alexander Gadzhalov
 */
class StateTracker {
    private latestBlock: LatestBlock;
    private numPools: NumPools;

    constructor(_latestBlock: LatestBlock, _numPools: NumPools) {
        this.latestBlock = _latestBlock;
        this.numPools = _numPools;
    }

    /**
     * Every five seconds sends an gRPC request to fetch the block height.
     * The block height then is parsed to integer. 
     * Checks if blockNumber % 10 == 0 then sends a gRPC request to fetch num pools
     * 
     * @returns void
     */
    public async runStateTracker(): Promise<any> {
        setInterval(() => this.stateTracker(), 5000)
    }

    private async stateTracker(): Promise<void> {
        const blockNumber = parseInt(await this.latestBlock.fetchBlockHeigth());
        if (blockNumber % 10 == 0) {
            console.log("Fetched from state tracker", await this.numPools.fetchNumPools());
        }
    }
}

export default StateTracker;