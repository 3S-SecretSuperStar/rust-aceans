# Rustaceans

An extension project of [cranes.supply](https://cranes.supply/).

Rustaceans is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Inspiration

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Okay, I think I&#39;m ready to share. Here&#39;s my first homegrown NFT project: Cranes (for special wallets)<a href="https://t.co/u1ztYJSa89">https://t.co/u1ztYJSa89</a></p>&mdash; Mikkel Malmberg (@mikker) <a href="https://twitter.com/mikker/status/1438062157921464330?ref_src=twsrc%5Etfw">September 15, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Environment Variables

Create a `.env` file in the root directory of your project and add the variables from the `.env.example` file.

## Testing

Run `npx hardhat test` to run all tests.

## Deploying the contracts

#### Rinkeby Testnet

Run `npx hardhat run scripts/deploy-rinkeby.js --network rinkeby` to deploy the contracts to the Rinkeby testnet.

#### Mainnet

Run `npx hardhat run scripts/deploy-mainnet.js --network mainnet` to deploy the contracts to the Mainnet.

#### Verifying Contracts

Since this is a 👷 hardhat 👷 project, we can use the [@nomiclabs/hardhat-etherscan](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html) plugin to automatically verify our contracts with one simple command.

On Rinkeby Network: `npx hardhat verify --network rinkeby <DEPLOYED_CONTRACT_ADDRESS>`

On Mainnet: `npx hardhat verify --network mainnet <DEPLOYED_CONTRACT_ADDRESS>`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
