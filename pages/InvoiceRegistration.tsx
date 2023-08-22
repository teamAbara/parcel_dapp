import { useEffect, useState } from "react";
import { InvoiceRegistration } from "@/components/InvoiceRegistrationPage/InvoiceRegistration";
import Image from "next/image";

import InvoiceRegistrationLogo from "@img/InvoiceRegistration.jpeg";
export default function InvoiceRegistrationPage() {
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
          <Image
            src={InvoiceRegistrationLogo}
            alt="Picture of me"
            style={{ width: "100%", height: "100%" }}
          />
          <InvoiceRegistration />
        </div>
      </>
    )
  );
}
