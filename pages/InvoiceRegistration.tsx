import { ethos, TransactionBlock, SignInButton } from "ethos-connect";
import { useEffect, useState } from "react";
import { GetInTouch } from "@/components/main/parcel";

export default function Home() {
  const { wallet } = ethos.useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <div
          style={{
            backgroundColor: "white",
            minHeight: "500px",
            marginTop: 150,
          }}
        >
          <GetInTouch />
        </div>
      </>
    )
  );
}
