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

  /*택배 리스트 받아와서 자신이 받은거나 보낸거만  택배만 필터 */
  const parcel_list_arr = parcel_list?.filter(
    (item: any) =>
      item.to_address == wallet?.address || item.from_address == wallet?.address
  );
  //그중에 가장 최신것만 가져오기
  const parcel = parcel_list_arr.reverse()[0];
  return (
    parcel && (
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
                    보낸사람:{parcel.from_address}
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
                    받은 사람:{parcel.to_address}
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
                    택배원:{parcel.worker_address}
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
                    택배 현황:
                    {parcel.progress == 1
                      ? "집화처리"
                      : parcel.process == 2
                      ? "간선상차"
                      : parcel.process == 3
                      ? "간선하차"
                      : parcel.process == 4
                      ? "배송출고"
                      : "배송완료"}
                  </p>
                </div>
              </Stack>
            </SimpleGrid>
          </Container>
        </ScrollArea>
      </>
    )
  );
}
