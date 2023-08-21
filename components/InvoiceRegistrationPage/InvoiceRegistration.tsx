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
import { useState, useCallback, useEffect } from "react";
import { ethos, TransactionBlock, SignInButton } from "ethos-connect";

import {
  IconAlignLeft,
  IconUser,
  IconPhone,
  IconMapPin,
  IconAt,
  IconBox,
  IconCurrencyWon,
} from "@tabler/icons-react";
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
  const { classes } = useStyles();
  const { wallet } = ethos.useWallet();

  /*보내는사람 */
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false); //모달창
  const [from_name, setFromName] = useState(""); //이름
  const [from_email, setFromEmail] = useState(""); //이메일
  const [from_phone_number, setFromPhoneNumber] = useState(""); //연락처1
  const [from_phone_number2, setFromPhoneNumber2] = useState(""); //연락처2
  const [from_address, setFromAddress] = useState(""); //주소
  const [requst, setRequest] = useState(""); //요청사항

  /*받는사람 */
  const [slowTransitionOpened2, setSlowTransitionOpened2] = useState(false); //모달창
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
  const [item_type, setItemType] = useState<string | null>(null);

  const [parcel_price, setParcelPrice] = useState("");
  const [to_account, setToAccount] = useState("");
  /*보내는 사람 주소 저장 */
  const onCompletePost = (data: any) => {
    setFromAddress(data.address);

    setSlowTransitionOpened(false);
  };
  /*받는 사람 주소 저장 */
  const onCompletePost2 = (data: any) => {
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
      description: from_address,
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
      description: to_address,
      icon: IconMapPin,
    },
    {
      title: "물품 명",
      description: item_name,
      icon: IconBox,
    },
    {
      title: "물품 가격",
      description: item_price,
      icon: IconCurrencyWon,
    },
    {
      title: "물품 크기",
      description: item_size,
      icon: IconBox,
    },
    {
      title: "물품 무게",
      description: item_kg,
      icon: IconBox,
    },
    {
      title: "우임구분",
      description: item_type,
      icon: IconBox,
    },
  ];

  /*택배 블록체인에 저장 */
  const create_parcel = async () => {
    if (!wallet?.currentAccount) return;
    if (!process.env.NEXT_PUBLIC_PARCEL_LIST_OBJECT) return;
    if (!process.env.NEXT_PUBLIC_SUI_PACKAGE) return;

    const metadata = {
      pinataMetadata: {
        name: from_name + 1,
      },
      pinataContent: {
        from_name: from_name,
        from_phone_number: from_phone_number,
        from_phone_number2: from_phone_number2,
        from_address: from_address,
        from_email: from_email,
        requst: requst,
        to_name: to_name,
        to_phone_number: to_phone_number,
        to_phone_number2: to_phone_number2,
        to_address: to_address,
        item_name: item_name,
        item_price: item_price,
        item_size: item_size,
        item_kg: item_kg,
        item_type: item_type,
      },
    };
    const pinJsonUrl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const pinataJsonRsp = await axios.post(pinJsonUrl, metadata, {
      headers: {
        pinata_api_key: "c1f5c76737c17169fc9d",
        pinata_secret_api_key:
          "d10c98647ecb75089d6cff03d6e995e5b5d6d87d4217281c4d2c1698ce293cfa",
      },
    });
    try {
      const transactionBlock = new TransactionBlock();
      transactionBlock.moveCall({
        target: `${process.env.NEXT_PUBLIC_SUI_PACKAGE.toString()}::parcel::parcel_reservation`,
        arguments: [
          transactionBlock.object(
            process.env.NEXT_PUBLIC_PARCEL_LIST_OBJECT.toString()
          ),
          transactionBlock.pure(wallet.address, "address"),
          transactionBlock.pure(wallet.address, "address"),
          transactionBlock.pure(wallet.address, "address"),
          transactionBlock.pure(pinataJsonRsp.data.IpfsHash),
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

      if (response?.objectChanges) {
        const createdObject = response.objectChanges.find(
          e => e.type === "created"
        );
        if (createdObject && "objectId" in createdObject) {
          // setNftObjectId(createdObject.objectId);
        }
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size="xl">
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <Text fz="lg" fw={700} className={classes.title} c="#fff">
              송장
            </Text>

            <ContactIconsList variant="white" data={MOCKDATA} />
          </div>
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
                <TextInput
                  label="물품 가격"
                  placeholder="물품 가격"
                  required
                  onChange={e => setItemPrice(e.target.value)}
                />
                <TextInput
                  mt="md"
                  label="물품 크기"
                  placeholder="물품 크기"
                  required
                  onChange={e => setItemSize(e.target.value)}
                />
                <TextInput
                  mt="md"
                  label="물품 무게"
                  placeholder="물품 무게"
                  required
                  onChange={e => setItemKg(e.target.value)}
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
                    create_parcel();
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
          onClose={close}
          centered
          title="주소"
          transitionProps={{ transition: "fade", duration: 200 }}
        >
          <DaumPostcode autoClose={false} onComplete={onCompletePost} />
        </Modal>
        <Modal
          opened={slowTransitionOpened2}
          onClose={close}
          centered
          title="주소"
          transitionProps={{ transition: "fade", duration: 200 }}
        >
          <DaumPostcode autoClose={false} onComplete={onCompletePost2} />
        </Modal>
      </Paper>
    </Container>
  );
}
