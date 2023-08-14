"use client";

import { Chain, EthosConnectProvider } from "ethos-connect";

export default function Home() {
  const ethosConfiguration = {
    preferredWallets: ["Ethos Wallet"],
    chain: Chain.SUI_TESTNET,
  };

  return (
    <EthosConnectProvider
      dappName="<your dApp's Name>"
      ethosConfiguration={ethosConfiguration}
      dappIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height={56}
          width={56}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      }
      connectMessage="Your connect message goes here!"
    >
      <main
        style={{ backgroundColor: "white", minHeight: "500px", width: "100%" }}
      >
        <div>ddada</div>
      </main>
    </EthosConnectProvider>
  );
}
