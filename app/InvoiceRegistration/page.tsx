"use client";
import Image from "next/image";
import { ethos, TransactionBlock, SignInButton } from "ethos-connect";
import { useEffect, useState } from "react";
import { GetInTouch } from "../component/main/parcel";

export default function Home() {
  const { wallet } = ethos.useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div
        style={{
          backgroundColor: "white",
          minHeight: "500px",
          marginTop: 150,
        }}
      >
        {/* <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex-6">
          {!wallet ? (
            <SignInButton className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Connect
            </SignInButton>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Connected to wallet
                </h2>
                <code>{wallet.address}</code>
                <div className="place-content-center text-base font-medium text-ethos-primary space-x-1">
                  <div>
                    Wallet balance:{" "}
                    <code>{wallet.contents?.suiBalance.toString()}</code> Mist
                  </div>
                  <div className="text-xs text-gray-500">
                    (1 sui is 10^9 Mist)
                  </div>
                </div>
              </div>
            </div>
          )} */}

        {/* </div> */}
        <GetInTouch />
      </div>
    )
  );
}
