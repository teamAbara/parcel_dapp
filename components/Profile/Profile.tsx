import { ethos } from "ethos-connect";
import { useEffect, useState } from "react";
import { InvoiceRegistration } from "@/components/InvoiceRegistrationPage/InvoiceRegistration";
import { SimpleGrid, Container, Stack, Button, Grid } from "@mantine/core";
import Tab from "./test";
export function Profile() {
  const { wallet } = ethos.useWallet();

  return (
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
                  style={{
                    backgroundColor: "#FFCD4A",
                    height: 100,
                    margin: 10,
                    borderRadius: 20,
                  }}
                >
                  <SimpleGrid
                    cols={1}
                    breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                  >
                    <Grid sx={{ marginTop: 25, textAlign: "center" }}>
                      <Grid.Col span={6}>
                        <Button sx={{ width: "80%" }}>{wallet?.address}</Button>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Button sx={{ width: "80%" }}>{wallet?.address}</Button>
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
                style={{
                  backgroundColor: "red",
                  height: 100,
                  margin: 10,
                  borderRadius: 20,
                }}
              ></div>
            </Stack>
            <Stack>
              <div
                style={{
                  backgroundColor: "red",
                  height: 100,
                  margin: 10,
                  borderRadius: 20,
                }}
              ></div>
            </Stack>
            <Stack>
              <div
                style={{
                  backgroundColor: "red",
                  height: 100,
                  margin: 10,
                  borderRadius: 20,
                }}
              ></div>
            </Stack>
          </SimpleGrid>

          <Tab />
        </Container>
      </div>
    </>
  );
}
