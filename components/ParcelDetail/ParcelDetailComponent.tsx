import { SimpleGrid, Container, Stack, Button, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import QRCode from "qrcode"; // qrcode 라이브러리 불러오기
import axios from "axios";
import { TimeLine } from "./TimeLine";
import bg from "@img/parcel.jpeg"; //송장 배경화면

export function ParcelDetailComponent(props: any) {
  const { id, parcel_list, from_account, to_account, worker_acount, progress } =
    props;

  /*qrcode */
  const [qrCodeData, setQRCodeData] = useState("");
  /*보내는사람 */
  const [from_name, setFromName] = useState(""); //이름
  const [from_email, setFromEmail] = useState(""); //이메일
  const [from_phone_number, setFromPhoneNumber] = useState(""); //연락처1
  const [from_phone_number2, setFromPhoneNumber2] = useState(""); //연락처2
  const [from_address, setFromAddress] = useState(""); //주소
  const [requst, setRequest] = useState(""); //요청사항

  /*받는사람 */
  const [to_name, setToName] = useState(""); //주소
  const [to_email, setToEmail] = useState(""); //이메일
  const [to_phone_number, setToPhoneNumber] = useState(""); //연락처1
  const [to_phone_number2, setToPhoneNumber2] = useState(""); //연락처2
  const [to_address, setToAddress] = useState(""); //주소
  /*물품 */
  const [item_name, setItemnName] = useState("");
  const [item_price, setItemPrice] = useState("");
  const [item_size, setItemSize] = useState("");
  const [item_kg, setItemKg] = useState("");
  const [item_type, setItemType] = useState("");
  useEffect(() => {
    if (!parcel_list) return;
  }, [parcel_list]);
  //qrcode생성하기
  const generateQRCode = async () => {
    try {
      // QR 코드 생성

      const qrCodeDataURL = await QRCode.toDataURL(id);
      setQRCodeData(qrCodeDataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
  //메타데이터 가져오기
  useEffect(() => {
    if (!parcel_list) return;
    const meta_data_list = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_IPFS_ADDR}/${parcel_list.url}`)
        .then(res => {
          //보낸사람
          console.log(res.data.properties);
          setFromName(res.data.properties.from_name);
          setFromPhoneNumber(res.data.properties.from_phone_number);
          setFromPhoneNumber2(res.data.properties.from_phone_number2);
          setFromEmail(res.data.from_email);
          setFromAddress(res.data.properties.from_address);
          setRequest(res.data.properties.request);
          //받는사람
          setToName(res.data.properties.to_name);
          setToAddress(res.data.properties.to_address);
          setToPhoneNumber(res.data.properties.to_phone_number);
          setToPhoneNumber2(res.data.properties.to_phone_number2);
          setToEmail(res.data.properties.to_email);

          //물품
        });
    };
    meta_data_list();
  }, [parcel_list]);
  return (
    <div>
      <Container size="md">
        <SimpleGrid cols={1} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
          <Stack>
            {
              <div
                style={{
                  backgroundColor: "#FFCD4A",
                  height: "100%",
                  margin: 10,
                  borderRadius: 20,
                }}
              >
                <Stack>
                  <div
                    style={{
                      backgroundColor: "#FFCD4A",
                      height: "100%",
                      margin: 10,
                      borderRadius: 20,
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={bg.src}
                        style={{ width: "100%", borderRadius: 20 }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          zIndex: 1,
                          width: "100%",
                          height: "100%",
                          transform: "translate(-50%, -50%)",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Grid
                          gutter={5}
                          gutterXs="md"
                          gutterMd="xl"
                          gutterXl={50}
                        >
                          <Grid.Col span={12} style={{ paddingTop: "10%" }} />
                          <Grid.Col span={1} style={{ paddingTop: "13%" }} />
                          <Grid.Col span={11} style={{ paddingTop: "13%" }}>
                            {from_address}
                          </Grid.Col>
                          <Grid.Col span={1} style={{ paddingTop: "5%" }} />
                          <Grid.Col span={7} style={{ paddingTop: "5%" }}>
                            {to_address}
                          </Grid.Col>
                          <Grid.Col
                            span={2}
                            style={{ paddingTop: "5%", textAlign: "center" }}
                          >
                            {item_type}
                          </Grid.Col>
                          <Grid.Col span={2} style={{ paddingTop: "5%" }}>
                            {/* {parcel_price} */}
                          </Grid.Col>
                          <Grid.Col span={1} style={{ paddingTop: "3%" }} />
                          <Grid.Col span={9} style={{ paddingTop: "3%" }}>
                            {item_name}
                          </Grid.Col>
                          <Grid.Col span={1} style={{ paddingTop: "3%" }} />
                          <Grid.Col
                            span={9}
                            style={{ paddingTop: "3%" }}
                          ></Grid.Col>
                        </Grid>
                      </div>
                    </div>
                  </div>
                </Stack>
                <SimpleGrid
                  cols={1}
                  breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                >
                  <Stack>
                    <div
                      style={{
                        backgroundColor: "rgb(51 50 61)",
                        height: "100%",
                        margin: 10,
                        borderRadius: 20,
                        padding: 40,
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
                        진행사항
                      </p>

                      <TimeLine num={progress} />
                    </div>
                  </Stack>
                  <Stack>
                    <div
                      style={{
                        backgroundColor: "rgb(51 50 61)",
                        height: "100%",
                        margin: 10,
                        borderRadius: 20,
                        padding: 40,
                      }}
                    >
                      <Button onClick={generateQRCode}>Qr</Button>
                      {qrCodeData && (
                        <img src={qrCodeData} width="80%" alt="QR Code" />
                      )}
                    </div>
                  </Stack>
                </SimpleGrid>
              </div>
            }
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  );
}
