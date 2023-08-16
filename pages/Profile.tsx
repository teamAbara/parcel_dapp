import { ethos } from "ethos-connect";
import { useEffect, useState } from "react";
import { InvoiceRegistration } from "@/components/InvoiceRegistrationPage/InvoiceRegistration";
import { SimpleGrid, Container, Stack, Button, Grid } from "@mantine/core";
import { Profile } from "@/components/Mypage/Profile";
export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const { wallet } = ethos.useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <div
          style={{
            backgroundColor: "white",
            minHeight: "600px",
            marginTop: 150,
          }}
        >
          <Profile />
        </div>
      </>
    )
  );
}
