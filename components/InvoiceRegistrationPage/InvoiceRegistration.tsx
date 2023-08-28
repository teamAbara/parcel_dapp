import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  rem,
  Modal,
  Select,
  Container,
} from "@mantine/core";
import { ContactIconsList } from "./ContractIcons";
import bg from "@img/bg.svg";
import DaumPostcode from "react-daum-postcode";
import { useState, useEffect } from "react";
import { ethos } from "ethos-connect";
import { useRouter } from "next/router";
import {
  IconAlignLeft,
  IconUser,
  IconPhone,
  IconMapPin,
  IconAt,
  IconBox,
} from "@tabler/icons-react";
import { TransactionBlock } from "ethos-connect";
import { create } from "ipfs-http-client";
import axios from "axios";
const useStyles = createStyles(theme => {
  const BREAKPOINT = theme.fn.smallerThan("sm");
  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: rem(4),
      border: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: rem(30),
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg,
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(280)}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export function InvoiceRegistration() {
  const router = useRouter();
  const { classes } = useStyles();
  const { wallet } = ethos.useWallet();
  /*보내는사람 */
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false); //모달창
  const [from_name, setFromName] = useState(""); //이름
  const [from_email, setFromEmail] = useState(""); //이메일
  const [from_phone_number, setFromPhoneNumber] = useState(""); //연락처1
  const [from_phone_number2, setFromPhoneNumber2] = useState(""); //연락처2
  const [from_address, setFromAddress] = useState(""); //주소
  const [from_address_detail, setFromAddressDetail] = useState(""); //주소

  const [requst, setRequest] = useState(""); //요청사항
  const [ipfs, setIpfs] = useState(null); // IPFS 객체 상태 추가

  /*받는사람 */
  const [slowTransitionOpened2, setSlowTransitionOpened2] = useState(false); //모달창
  const [to_name, setToName] = useState(""); //주소
  const [to_email, setToEmail] = useState(""); //이메일
  const [to_phone_number, setToPhoneNumber] = useState(""); //연락처1
  const [to_phone_number2, setToPhoneNumber2] = useState(""); //연락처2
  const [to_address, setToAddress] = useState(""); //주소
  const [to_address_detail, setToAddressDetail] = useState(""); //주소

  const [to_zonecode, setToZonecode] = useState<number>(0);
  /*물품 */
  const [item_name, setItemnName] = useState(""); //물품명
  const [box_size, setBoxSize] = useState<string | null>(null); //물품사이즈
  const [item_type, setItemType] = useState<string | null>(null); //운임구분

  const [parcel_price, setParcelPrice] = useState("");
  const [to_account, setToAccount] = useState(""); //받는 분 지갑 주소
  const [slowTransitionOpened3, setSlowTransitionOpened3] = useState(false); //모달창
  /*택배원 */
  const [worker_type, setWorkerType] = useState("");

  const [worker_public, setWorkerPublic] = useState("");

  /*보내는 사람 주소 저장 */
  const onCompletePost = (data: any) => {
    setFromAddress(data.address);

    setSlowTransitionOpened(false);
  };
  /*받는 사람 주소 저장 */
  const onCompletePost2 = (data: any) => {
    setToZonecode(data.zonecode);

    setToAddress(data.address);

    setSlowTransitionOpened2(false);
  };

  const MOCKDATA = [
    { title: "보내는 분", description: from_name, icon: IconUser },
    {
      title: "보내는 분 Email",
      description: from_email,
      icon: IconAt,
    },
    {
      title: "보내는 분 연락처1",
      description: from_phone_number,
      icon: IconPhone,
    },
    {
      title: "보내는 분 연락처2",
      description: from_phone_number2,
      icon: IconPhone,
    },

    {
      title: "보내는 분 주소",
      description: `${from_address} ${from_address_detail}`,
      icon: IconMapPin,
    },
    {
      title: "요청사항",
      description: requst,
      icon: IconAlignLeft,
    },
    { title: "받는 분", description: to_name, icon: IconUser },
    {
      title: "받는 분 Email",
      description: to_email,
      icon: IconAt,
    },
    {
      title: "받는 분 연락처1",
      description: to_phone_number,
      icon: IconPhone,
    },
    {
      title: "받는 분 연락처2",
      description: to_phone_number2,
      icon: IconPhone,
    },

    {
      title: "받는 분 주소",
      description: `${to_address} ${to_address_detail}`,
      icon: IconMapPin,
    },
    {
      title: "물품 명",
      description: item_name,
      icon: IconBox,
    },
    {
      title: "박스 크기",
      description: box_size,
      icon: IconBox,
    },

    {
      title: "우임구분",
      description: item_type,
      icon: IconBox,
    },
    {
      title: "택배원",
      description: worker_type,
      icon: IconBox,
    },
    {
      title: "가격",
      description: parcel_price,
      icon: IconBox,
    },
  ];

  /*택배 블록체인에 저장 */
  const create_parcel = async () => {
    if (!wallet?.currentAccount) return;
    if (!process.env.NEXT_PUBLIC_PARCEL_LIST_OBJECT) return;
    if (!process.env.NEXT_PUBLIC_SUI_PACKAGE) return;
    //빈값 처리
    if (to_zonecode == 0) {
      alert("주소를 다시 입력해 주세요");
    }
    if (to_account == "") {
      alert("받는 분 주소를 입력해주세요");
    }

    try {
      //ipfs설정
      const auth =
        "Basic " +
        Buffer.from(
          `${process.env.NEXT_PUBLIC_IPFS_ID}:${process.env.NEXT_PUBLIC_IPFS_PW}`
        ).toString("base64");
      const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
          authorization: auth,
        },
      });

      const metadata = {
        title: "to_name + 3",
        type: "object",
        properties: {
          from_name: from_name,
          from_phone_number: from_phone_number,
          from_phone_number2: from_phone_number2,
          from_address: from_address + from_address_detail,
          from_email: from_email,
          requst: requst,
          to_name: to_name,
          to_phone_number: to_phone_number,
          to_phone_number2: to_phone_number2,
          to_address: to_address + to_address_detail,
          item_name: item_name,
          box_size: box_size,
          item_type: item_type,
        },
      };
      const json = await ipfs.add(JSON.stringify(metadata));
      const json_cid = json.path;
      const transactionBlock = new TransactionBlock();
      transactionBlock.moveCall({
        target: `${process.env.NEXT_PUBLIC_SUI_PACKAGE.toString()}::parcel::parcel_reservation`,
        arguments: [
          transactionBlock.object(
            process.env.NEXT_PUBLIC_PARCEL_LIST_OBJECT.toString()
          ),
          transactionBlock.pure(wallet.address, "address"), //보내는분
          transactionBlock.pure(
            "0x6cb2311de483fa5009db5efcf7ab775332c970510f57fd78fa651f4aa51d5e6e",
            "address"
          ), //받는분
          transactionBlock.pure(worker_public, "address"), //택배기사 주소
          transactionBlock.pure(json_cid),
        ],
      });
      const response = await wallet.signAndExecuteTransactionBlock({
        transactionBlock,
        options: {
          showInput: true,
          showEffects: true,
          showEvents: true,
          showBalanceChanges: true,
          showObjectChanges: true,
        },
      });
      console.log(response);
      //성공하면 프로필 페이지
      router.push("/Profile");
    } catch (error) {
      //실패하면 메인페이지로
      console.log(error);
      // router.push("/");
    }
  };
  //가격측정
  const setPrice = () => {
    if (!box_size) return;

    if (box_size == "크기:80cm 이하 무게:3kg 이하") {
      setParcelPrice("2.7sui");
    } else if (box_size == "크기:80㎝∼100㎝ 무게:3kg∼5kg") {
      setParcelPrice("3.2sui");
    } else if (box_size == "크기:80㎝∼100㎝ 무게:5kg∼7kg") {
      setParcelPrice("3.7sui");
    } else if (box_size == "크기:100㎝∼120㎝ 무게:7kg∼10kg") {
      setParcelPrice("4.7sui");
    } else if (box_size == "크기:100㎝∼120㎝ 무게:10kg∼15kg") {
      setParcelPrice("5.7sui");
    } else if (box_size == "크기:100㎝∼120㎝ 무게:15kg∼20kg") {
      setParcelPrice("6.7sui");
    } else if (box_size == "크기:100㎝∼120㎝ 무게:20kg∼25kg") {
      setParcelPrice("8.7sui");
    } else if (box_size == "크기:120㎝∼160㎝ 무게:25kg∼30kg") {
      setParcelPrice("10.7sui");
    }
  };
  useEffect(() => {
    if (!to_zonecode) return;
    const get_parcel_worker = async () => {
      await axios
        .post("/parcel/get_worker", { zonecode: to_zonecode })
        .then(res => {
          //결과값이 ture면
          if (res.data.result == true) {
            setWorkerType(res.data.type);
            setWorkerPublic(res.data.worker_public);
          }
        });
    };
    get_parcel_worker();
    setPrice();
  }, [to_zonecode, box_size]);
  console.log(parcel_price);
  return (
    <Container size="xl">
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <form
            className={classes.form}
            onSubmit={event => event.preventDefault()}
          >
            <Text fz="lg" fw={700} className={classes.title}>
              보내는 분
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput
                  label="성함"
                  placeholder="Your name"
                  required
                  onChange={e => {
                    setFromName(e.target.value);
                  }}
                />
                <TextInput
                  label="이메일"
                  placeholder="hello@mantine.dev"
                  required
                  onChange={e => {
                    setFromEmail(e.target.value);
                  }}
                />
                <TextInput
                  mt="md"
                  label="연락처1"
                  placeholder="phone"
                  required
                  onChange={e => {
                    setFromPhoneNumber(e.target.value);
                  }}
                />
                <TextInput
                  mt="md"
                  label="연락처2"
                  placeholder="phone2"
                  required
                  onChange={e => {
                    setFromPhoneNumber2(e.target.value);
                  }}
                />
                <TextInput
                  mt="md"
                  label="주소"
                  placeholder="address"
                  value={from_address}
                  required
                />
                <Group position="left" mt="md">
                  <Button
                    type="submit"
                    className={classes.control}
                    sx={{ marginTop: 20 }}
                    onClick={() => setSlowTransitionOpened(true)}
                  >
                    주소찾기
                  </Button>
                </Group>
              </SimpleGrid>
              <TextInput
                mt="md"
                label="상세 주소"
                placeholder="상세 주소"
                required
                onChange={e => {
                  setFromAddressDetail(e.target.value);
                }}
              />
              <Textarea
                mt="md"
                label="요청사항"
                placeholder="requst"
                minRows={3}
                onChange={e => {
                  setRequest(e.target.value);
                }}
              />

              <Group position="right" mt="md"></Group>
            </div>
            <Text fz="lg" fw={700} className={classes.title}>
              받는 분
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput
                  label="성함"
                  placeholder="Your name"
                  required
                  onChange={e => setToName(e.target.value)}
                />
                <TextInput
                  label="이메일"
                  placeholder="hello@mantine.dev"
                  required
                  onChange={e => setToEmail(e.target.value)}
                />
                <TextInput
                  mt="md"
                  label="연락처1"
                  placeholder="phone"
                  required
                  onChange={e => setToPhoneNumber(e.target.value)}
                />
                <TextInput
                  mt="md"
                  label="연락처2"
                  placeholder="phone2"
                  required
                  onChange={e => setToPhoneNumber2(e.target.value)}
                />
                <TextInput
                  mt="md"
                  label="주소"
                  placeholder="address"
                  value={to_address}
                  required
                />
                <Group position="left" mt="md">
                  <Button
                    type="submit"
                    className={classes.control}
                    sx={{ marginTop: 20 }}
                    onClick={() => setSlowTransitionOpened2(true)}
                  >
                    주소찾기
                  </Button>
                </Group>
              </SimpleGrid>
              <TextInput
                mt="md"
                label="상세 주소"
                placeholder="상세 주소"
                required
                onChange={e => {
                  setToAddressDetail(e.target.value);
                }}
              />
              <TextInput
                mt="md"
                label="지갑 주소"
                placeholder="지갑 주소"
                required
                onChange={e => {
                  setToAccount(e.target.value);
                }}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <Text fz="lg" fw={700} className={classes.title}>
                물품
              </Text>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput
                  label="물품 명"
                  placeholder="물품 명"
                  required
                  onChange={e => setItemnName(e.target.value)}
                />
                <Select
                  label="박스 크기.무게"
                  placeholder="Pick one"
                  onChange={setBoxSize}
                  data={[
                    {
                      value: "크기:80cm 이하 무게:3kg 이하",
                      label: "크기:80cm 이하 무게:3kg 이하",
                    },
                    {
                      value: "크기:80㎝∼100㎝ 무게:3kg∼5kg",
                      label: "크기:80㎝∼100㎝ 무게:3kg∼5kg",
                    },
                    {
                      value: "크기:80㎝∼100㎝ 무게:5kg∼7kg",
                      label: "크기:80㎝∼100㎝ 무게:5kg∼7kg",
                    },
                    {
                      value: "크기:100㎝∼120㎝ 무게:7kg∼10kg",
                      label: "크기:100㎝∼120㎝ 무게:7kg∼10kg",
                    },
                    {
                      value: "크기:100㎝∼120㎝ 무게:10kg∼15kg",
                      label: "크기:100㎝∼120㎝ 무게:10kg∼15kg",
                    },
                    {
                      value: "크기:100㎝∼120㎝ 무게:15kg∼20kg",
                      label: "크기:100㎝∼120㎝ 무게:15kg∼20kg",
                    },
                    {
                      value: "크기:100㎝∼120㎝ 무게:20kg∼25kg",
                      label: "크기:100㎝∼120㎝ 무게:20kg∼25kg",
                    },
                    {
                      value: "크기:120㎝∼160㎝ 무게:25kg∼30kg",
                      label: "크기:120㎝∼160㎝ 무게:25kg∼30kg",
                    },
                  ]}
                />

                <Select
                  label="우임구분"
                  placeholder="Pick one"
                  onChange={setItemType}
                  data={[
                    { value: "선불", label: "선불" },
                    { value: "착불", label: "착불" },
                  ]}
                />
              </SimpleGrid>
              <Group position="right" mt="md">
                <Button
                  onClick={(e: any) => {
                    setSlowTransitionOpened3(true);
                  }}
                  className={classes.control}
                >
                  택배 예약하기
                </Button>
              </Group>
            </div>
          </form>
        </div>
        <Modal
          opened={slowTransitionOpened}
          onClose={() => setSlowTransitionOpened(false)}
          centered
          title="주소"
          transitionProps={{ transition: "fade", duration: 200 }}
        >
          <DaumPostcode autoClose={false} onComplete={onCompletePost} />
        </Modal>
        <Modal
          opened={slowTransitionOpened2}
          onClose={() => setSlowTransitionOpened2(false)}
          centered
          title="주소"
          transitionProps={{ transition: "fade", duration: 200 }}
        >
          <DaumPostcode autoClose={false} onComplete={onCompletePost2} />
        </Modal>
        <Modal
          size={"xl"}
          opened={slowTransitionOpened3}
          onClose={() => setSlowTransitionOpened3(false)}
          centered
          title="주소"
          transitionProps={{ transition: "fade", duration: 200 }}
        >
          <div className={classes.contacts} style={{ marginTop: 100 }}>
            <Text fz="xl" fw={800} className={classes.title} c="#fff">
              송장
            </Text>

            <ContactIconsList variant="white" data={MOCKDATA} />
          </div>
          <Group position="center">
            <Button
              onClick={() => {
                create_parcel();
              }}
            >
              택배 예약
            </Button>
          </Group>
        </Modal>
      </Paper>
    </Container>
  );
}
