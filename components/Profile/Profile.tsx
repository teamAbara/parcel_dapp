import { ethos } from "ethos-connect";
import { useEffect, useState } from "react";
import { TransactionBlock } from "ethos-connect";
import {
  SimpleGrid,
  Container,
  Stack,
  Button,
  Grid,
  Text,
  Title,
  CopyButton,
} from "@mantine/core";
import { BCS, getSuiMoveConfig } from "@mysten/bcs";

import { useRouter } from "next/router";
import CourierSent from "./CourierSent";
import CourierReceived from "./CourierReceived";
import RecentTransaction from "./RecentTransaction";
//마이페이지
export function Profile() {
  const bcs = new BCS(getSuiMoveConfig());

  const router = useRouter();
  const [parcel_list, setParcelList] = useState<any[]>([]);
  const { wallet } = ethos.useWallet();

  /* 월렛이 로그인이 안대있으면 메인페이지로 이동*/
  useEffect(() => {
    if (!wallet) {
      router.push("/");
    }
  }, [wallet]);
  useEffect(() => {
    const providers = async () => {
      //지갑이 없으면 리턴
      if (!wallet) return;
      //오브젝트 id가 없으면 리턴
      if (!process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT) return;
      //오브젝트 id 불러와서 컨텐츠 불러오기
      const data = await wallet.provider.getObject({
        id: process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT,
        options: {
          showContent: true,
        },
      });
      if (data && data.data?.content?.dataType === "moveObject") {
        let data_arr = [];
        for (let i = 0; i < data.data?.content.fields.parcel_counter; i++) {
          data_arr.push(data.data?.content.fields.parcel_list[i].fields);
        }
        setParcelList(data_arr);
      }
    };
    providers();
  }, [wallet]);

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          minHeight: "700px",
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
                  backgroundColor: "#696969",

                  minHeight: 500,
                  margin: 10,
                  borderRadius: 20,
                }}
              >
                <RecentTransaction parcel_list={parcel_list} />
              </div>
            </Stack>
            <Stack>
              <div
                style={{
                  backgroundColor: "#696969",

                  maxHeight: 500,
                  margin: 10,
                  borderRadius: 20,
                }}
              >
                <CourierSent parcel_list={parcel_list} />
              </div>
            </Stack>
            <Stack>
              <div
                style={{
                  backgroundColor: "#696969",

                  maxHeight: 500,
                  margin: 10,
                  borderRadius: 20,
                }}
              >
                <CourierReceived parcel_list={parcel_list} />
              </div>
            </Stack>
          </SimpleGrid>
        </Container>
      </div>
    </>
  );
}
