import { SimpleGrid, Container, Stack, Button, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import QRCode from "qrcode"; // qrcode 라이브러리 불러오기
import axios from "axios";
import { TimeLine } from "./TimeLine";
export function ParcelDetailComponent(props: any) {
  const { parcel_list, from_account, to_account, worker_acount, progress } =
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

      const qrCodeDataURL = await QRCode.toDataURL(
        JSON.stringify({ to_name, to_email })
      );
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
        .get(`https://winner.mypinata.cloud/ipfs/${parcel_list.url}`)
        .then(res => {
          //보낸사람
          setFromName(res?.data?.from_name);
          setFromPhoneNumber(res.data.from_phone_number);
          setFromPhoneNumber2(res.data.from_phone_number2);
          setFromEmail(res.data.from_email);
          setFromAddress(res.data.from_address);
          setRequest(res.data.request);
          //받는사람
          setToName(res.data.to_name);
          setToAddress(res.data.to_address);
          setToPhoneNumber(res.data.to_phone_number);
          setToPhoneNumber2(res.data.to_phone_number2);
          setToEmail(res.data.to_email);

          //물품
        });
    };
    meta_data_list();
  }, [parcel_list]);
  console.log(progress);
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
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                >
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
                        보낸사람:{from_name}
                      </p>
                      <p
                        style={{
                          textAlign: "center",
                          color: "white",
                          margin: 10,
                          width: "90%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {from_account}
                      </p>
                    </div>
                  </Stack>
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
                        받은사람:{to_name}
                      </p>
                      <p
                        style={{
                          textAlign: "center",
                          color: "white",
                          margin: 10,
                          width: "90%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {to_account}
                      </p>
                    </div>
                  </Stack>
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
                        보낸 분 주소:{from_address}
                      </p>
                      <p></p>
                    </div>
                  </Stack>
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
                        받은 분 주소:{to_address}
                      </p>
                      <p></p>
                    </div>
                  </Stack>
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
                        보낸분 연락처 1:{from_phone_number}
                        {from_phone_number2}
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
                        보낸분 연락처 2:{from_phone_number}
                        {from_phone_number2}
                      </p>
                    </div>
                  </Stack>
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
                        받은 분 연락처 1:{to_phone_number}
                        {from_phone_number2}
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
                        받은 분 연락처 2:{to_phone_number2}
                        {from_phone_number2}
                      </p>
                    </div>
                  </Stack>
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
                        보낸 분 Email:{from_email}
                      </p>
                      <p></p>
                    </div>
                  </Stack>
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
                        받은 분 Email:{to_email}
                      </p>
                      <p></p>
                    </div>
                  </Stack>
                </SimpleGrid>
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
                        요청사항:{requst}
                      </p>
                    </div>
                  </Stack>
                </SimpleGrid>
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                >
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
                        물품명:{requst}
                      </p>
                    </div>
                  </Stack>
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
                        물품 가격:{requst}
                      </p>
                    </div>
                  </Stack>
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
                        물품 사이즈:{requst}
                      </p>
                    </div>
                  </Stack>
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
                        물품 무게:{requst}
                      </p>
                    </div>
                  </Stack>
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
                        운임 구분:{requst}
                      </p>
                    </div>
                  </Stack>
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
                        결제 가격:{requst}
                      </p>
                    </div>
                  </Stack>
                </SimpleGrid>
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
