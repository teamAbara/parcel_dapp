import { ethos } from "ethos-connect";
import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Container,
  Stack,
  Button,
  Grid,
  Text,
  Title,
  CopyButton,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

import ProfileTab from "./ProfileTab";
import { useRouter } from "next/router";

export function Profile() {
  const router = useRouter();
  const { wallet } = ethos.useWallet();
  useEffect(() => {
    if (!wallet) {
      router.push("/");
    }
  }, [wallet]);
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          minHeight: "600px",
          marginTop: 150,
        }}
      >
        <Container size="xl">
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
                        <CopyButton
                          value={
                            wallet ? wallet.address?.toString() : "notCopy"
                          }
                        >
                          {({ copied, copy }) => (
                            <Button
                              sx={{
                                width: "80%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              color={copied ? "teal" : "blue"}
                              onClick={copy}
                            >
                              {copied ? (
                                "Copied Address"
                              ) : (
                                <Text
                                  style={{
                                    fontSize: "120%",
                                    width: "800%",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {wallet?.address}
                                </Text>
                              )}
                            </Button>
                          )}
                        </CopyButton>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Title>
                          <Text span c="white" inherit>
                            {ethos.formatBalance(
                              wallet?.contents?.suiBalance.toString()
                            )}
                            SUI
                          </Text>
                        </Title>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Button
                          sx={{ width: "60%" }}
                          onClick={wallet?.disconnect}
                        >
                          로그아웃
                        </Button>
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
          <ProfileTab />
        </Container>
      </div>
    </>
  );
}
