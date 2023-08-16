import { ethos, TransactionBlock, SignInButton } from "ethos-connect";
import { useEffect, useState } from "react";
import { InvoiceRegistration } from "@/components/InvoiceRegistrationPage/InvoiceRegistration";

export default function Mypage() {
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
          <InvoiceRegistration />
        </div>
      </>
    )
  );
}
