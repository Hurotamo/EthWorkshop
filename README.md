<<<<<<< HEAD
# EthWorkshop
ETH Workshop
=======
# Ethereum Smart Contract Workshop

## Project Overview
This repository contains smart contracts and scripts for an Ethereum smart contract workshop. The main focus is on a custom ERC20 token with additional features, a game contract, and a lock contract. The project uses Hardhat for development, testing, and deployment.

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (Node package manager)
- Hardhat
- An Ethereum wallet private key for deployment (set in `.env` file as `PRIVATE_KEY`)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd erc-20
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your private key:
   ```
   PRIVATE_KEY=your_ethereum_wallet_private_key
   ```

## Compilation
Compile the smart contracts using Hardhat:
```bash
npx hardhat compile
```

## Deployment
The deployment script deploys three contracts: the custom ERC20 token, a game contract, and a lock contract.

To deploy to the Sepolia testnet:
```bash
npx hardhat run script/deploy.js --network sepolia
```

The Hardhat configuration (`hardhat.config.ts`) is set up to use the Sepolia testnet with the RPC URL and private key loaded from environment variables.

## Testing
Run the tests using Hardhat:
```bash
npx hardhat test
```

## Contracts

### DavaoEthWorksop (ERC20 Token)
- A custom ERC20 token named "DavaoEthWorksop" with symbol "DEW".
- Features include:
  - Minting tokens to any address by the owner.
  - Burning tokens by token holders (except the owner).
  - Freezing and unfreezing addresses to prevent token transfers.
  - Events emitted on token transfers and address freezing/unfreezing.

### DavaoEthGame
- A game contract that interacts with the DavaoEthWorksop token.
- (Refer to the contract source for detailed functionality.)

### Lock
- A contract that locks Ether until a specified unlock time.
- Deployed with 1 Ether locked for 1 day from deployment time.

## Directory Structure
- `contracts/` - Solidity smart contracts.
- `script/` - Deployment and utility scripts.
- `test/` - Test scripts for contracts.
- `hardhat.config.ts` - Hardhat configuration file.
- `package.json` - Project dependencies and scripts.
- `README.md` - Project documentation.

## Additional Notes
- Ensure your `.env` file is correctly set up with your private key before deploying.
- The project uses Solidity version 0.8.28.
- The deployment script uses the Hardhat Runtime Environment to deploy contracts.
