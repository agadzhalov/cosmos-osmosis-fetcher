import App from "./app";

/**
 * Used as a starting point of the application
 * @param endpoint is a gRPC endpoint
 */

const endpoint = "https://rpc-test.osmosis.zone:443";

const app = new App(endpoint);
app.run();