# Cosmos Osmosis fetcher

# Description

Typescript application that uses cosm.js to connect to Osmosis Chain.
# How to run the server 
**NOT runnable in browser because of webpack configuration**

First we have to install the dependencies 
```bash
  npm install
```

Then we can start the server with:
```bash
  npm start
```

Example result in the console:
```
Height 8377583
Hash 0E661C5F69278C8ACCE50355D0363E2DD81D8E0C18563C64ECFAB773D700E722
Num pools 764
Fetched from state tracker 764
```
# Architecture of the application

```jsx
├── proto
│   ├── dest                    - generated codec files
│   ├── proto                   - proto definition files 
├── public                      - webpack bundle.js
├── src
│   ├── app       
│   │   ├── LatestBlock.ts      - fetches info for latest block
│   │   ├── NumPools.ts         - fetches num pools
│   │   ├── StateTracker.ts     - blockchain statetracker for the latest block            
│   ├── app.ts                  - initial config and setup
│   ├── index.ts                - starting point of the application  
```

# Design decisions and overview
1. Downloaded proto definitions
2. Generated codec files using `protoc`
3. State Tracker - sends gRPC request every 5 seconds to check if block number % 10 == 0 - better approach is to use web sockets


# How to transform from application to Typescript SDK
1. Microbundle
2. NPM Link