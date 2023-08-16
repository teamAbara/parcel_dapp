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
} from "@mantine/core";
import { ContactIconsList } from "../Courierinquiry/ContractIcons";
import bg from "@img/bg.svg";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
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
      marginTop: rem(-12),
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
  /*보내는사람 */
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false); //모달창
  const [from_address, setFromAddress] = useState(""); //주소

  /*받는사람 */
  const [slowTransitionOpened2, setSlowTransitionOpened2] = useState(false); //모달창
  const [to_address, setToAddress] = useState(""); //주소

  /*물품 */

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
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            송장
          </Text>

          <ContactIconsList variant="white" />
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
              <TextInput label="성함" placeholder="Your name" required />
              <TextInput
                label="이메일"
                placeholder="hello@mantine.dev"
                required
              />
              <TextInput
                mt="md"
                label="연락처1"
                placeholder="Subject"
                required
              />
              <TextInput
                mt="md"
                label="연락처2"
                placeholder="Subject"
                required
              />
              <TextInput
                mt="md"
                label="주소"
                placeholder="Subject"
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
              placeholder="Please include all relevant information"
              minRows={3}
            />

            <Group position="right" mt="md"></Group>
          </div>
          <Text fz="lg" fw={700} className={classes.title}>
            받는 분
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              <TextInput label="성함" placeholder="Your name" required />
              <TextInput
                label="이메일"
                placeholder="hello@mantine.dev"
                required
              />
              <TextInput
                mt="md"
                label="연락처1"
                placeholder="Subject"
                required
              />
              <TextInput
                mt="md"
                label="연락처2"
                placeholder="Subject"
                required
              />
              <TextInput
                mt="md"
                label="주소"
                placeholder="Subject"
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

            <TextInput mt="md" label="Subject" placeholder="Subject" required />

            <Textarea
              mt="md"
              label="Your message"
              placeholder="Please include all relevant information"
              minRows={3}
            />

            <Group position="right" mt="md">
              <Button type="submit" className={classes.control}>
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
  );
}
