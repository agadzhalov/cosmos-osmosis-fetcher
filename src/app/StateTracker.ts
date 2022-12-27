import LatestBlock from "./LatestBlock";
import NumPools from "./NumPools";

class StateTracker {
    private latestBlock: LatestBlock;
    private numPools: NumPools;

    constructor(_latestBlock: LatestBlock, _numPools: NumPools) {
        this.latestBlock = _latestBlock;
        this.numPools = _numPools;
    }

    public async runStateTracker(): Promise<any> {
        setInterval(() => this.stateTracker(), 3000)
    }

    public async stateTracker(): Promise<void> {
        const blockNumber = parseInt(await this.latestBlock.fetchBlockHeigth());
        if (blockNumber % 10 == 0) {
            console.log("Fetched from tracker", await this.numPools.fetchNumPools());
        }
    }
}

export default StateTracker;