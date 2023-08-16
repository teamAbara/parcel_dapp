import { useEffect, useState } from "react";
import { InvoiceRegistration } from "@/components/InvoiceRegistrationPage/InvoiceRegistration";

export default function InvoiceRegistrationPage() {
  const [mounted, setMounted] = useState(false);
  //html
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
