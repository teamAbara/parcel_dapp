import { ethos } from "ethos-connect";
import { useEffect, useState } from "react";
import { SimpleGrid, Container, Stack, ScrollArea } from "@mantine/core";
import { useRouter } from "next/router";

export default function RecentTransaction({ parcel_list }: any) {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { wallet } = ethos.useWallet();

  /* 월렛이 로그인이 안대있으면 메인페이지로 이동*/
  useEffect(() => {
    if (!wallet) {
      router.push("/");
    }
  }, [wallet]);

  /*택배 리스트 받아와서 자신이 받은 택배만 필터 */
  const parcel_list_arr = parcel_list?.filter(
    (item: any) => item.to_address == wallet?.address && item.progress == "1"
  );
  return (
    <>
      <ScrollArea
        w={"100%"}
        h={"100%"}
        onScrollPositionChange={onScrollPositionChange}
      >
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
          }}
        >
          최근 거래내역
        </div>
        <Container size="xl">
          <SimpleGrid cols={1} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
            <Stack>
              <div
                style={{
                  backgroundColor: "rgb(51 50 61)",
                  height: "100%",
                  margin: 10,
                  borderRadius: 20,
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: 20,
                    width: "90%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  보낸사람:
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: 20,
                    width: "90%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  받은 사람:
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: 20,
                    width: "90%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  택배원:
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: 20,
                    width: "90%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  택배 현황:{" "}
                </p>
              </div>
            </Stack>
          </SimpleGrid>
        </Container>
      </ScrollArea>
    </>
  );
}