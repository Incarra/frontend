# Environment Setup for Wallet Connectivity

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# WalletConnect Project ID
# Get your project ID from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## Getting Your WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up or log in to your account
3. Create a new project
4. Copy the Project ID
5. Paste it in your `.env.local` file

## Supported Networks

The application is configured to support the following networks:
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Base
- Zora

## Wallet Support

RainbowKit supports the following wallets:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- Trust Wallet
- And many more...

## Development Notes

- The wallet connection uses a cosmic theme that matches the Incarra design system
- All wallet modals and interfaces are styled with the stellar color palette
- The connection status is displayed in the top-right corner of the application
- Users can copy their address and view it on Etherscan directly from the interface 