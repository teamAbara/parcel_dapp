import { Chain, EthosConnectProvider } from "ethos-connect";
import Layout from "@/components/layout";
import "../style/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  //월렛설정
  const ethosConfiguration = {
    preferredWallets: ["Ethos Wallet"],
    //testnet연결
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
      <Head>
        <title>X-Box</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EthosConnectProvider>
  );
}

export default MyApp;
