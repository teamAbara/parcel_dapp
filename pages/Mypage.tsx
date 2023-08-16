import { ethos, TransactionBlock, SignInButton } from "ethos-connect";
import { useEffect, useState } from "react";
import { InvoiceRegistration } from "@/components/InvoiceRegistrationPage/InvoiceRegistration";
import {
  SimpleGrid,
  Skeleton,
  Container,
  Stack,
  Button,
  Grid,
} from "@mantine/core";

export default function Mypage() {
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
            minHeight: "600px",
            marginTop: 150,
          }}
        >
          <Container size="md">
            <SimpleGrid cols={1} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
              <Stack>
                {
                  <div
                    style={{ backgroundColor: "red", height: 100, margin: 10 }}
                  >
                    <SimpleGrid
                      cols={1}
                      breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                    >
                      <Grid sx={{ marginTop: 25, textAlign: "center" }}>
                        <Grid.Col span={6}>
                          <Button>dd</Button>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Button>dd</Button>
                        </Grid.Col>
                      </Grid>
                    </SimpleGrid>
                  </div>
                }
              </Stack>
            </SimpleGrid>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
              <Stack>
                <div
                  style={{ backgroundColor: "red", height: 100, margin: 10 }}
                ></div>
              </Stack>
              <Stack>
                <div
                  style={{ backgroundColor: "red", height: 100, margin: 10 }}
                ></div>
              </Stack>
              <Stack>
                <div
                  style={{ backgroundColor: "red", height: 100, margin: 10 }}
                ></div>
              </Stack>
            </SimpleGrid>
          </Container>
        </div>
      </>
    )
  );
}
