import { ethos } from "ethos-connect";
import { useEffect, useState } from "react";
import { SimpleGrid, Container, Stack, ScrollArea } from "@mantine/core";
import { useRouter } from "next/router";
//보낸택배 페이지
export default function CourierSent({ parcel_list }: any) {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { wallet } = ethos.useWallet();

  /*택배 리스트 받아와서 자신이 보낸 택배만 필터 */
  const parcel_list_arr = parcel_list?.filter(
    (item: any) => item.from_address == wallet?.address
  );
  /* 월렛이 로그인이 안대있으면 메인페이지로 이동*/
  useEffect(() => {
    if (!wallet) {
      router.push("/");
    }
  }, [wallet]);
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
          보낸택배
        </div>
        <Container size="xl">
          <SimpleGrid cols={1} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
            <Stack>
              {parcel_list_arr.map((item: any) => (
                <div
                  style={{
                    backgroundColor: "rgb(51 50 61)",
                    height: 100,
                    margin: 10,
                    borderRadius: 20,
                  }}
                  onClick={e => {
                    router.push(`/ParcelDetail/${item.id}`);
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
                    받은 주소:{item.to_address}
                  </p>
                </div>
              ))}
            </Stack>
          </SimpleGrid>
        </Container>
      </ScrollArea>
    </>
  );
}
