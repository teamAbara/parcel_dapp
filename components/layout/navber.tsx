import { ethos } from "ethos-connect";
import { SignInButton } from "ethos-connect";
import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Logo from "@img/logo.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
const HEADER_HEIGHT = rem(0);

const useStyles = createStyles(theme => ({
  logo: {},
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "light"
        ? theme.colors.dark[0]
        : theme.colors.gray[0],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[7],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
  }[];
}
/*상단헤더 */
export function HeaderAction({ links }: HeaderActionProps) {
  const router = useRouter();
  const { wallet } = ethos.useWallet();
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map(link => {
    return (
      <a
        key={link.label}
        onClick={e => {
          if (!wallet) {
            //로그인 미완료시 처리
            alert("로그인을 먼저해주세요");
          } else {
            router.push(link.link);
          }
        }}
        className={classes.link}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0, backgroundColor: "#091140" }}
      mb={0}
    >
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Link href="/">
            <Image
              src={Logo}
              alt="Picture of me"
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {!wallet ? (
          <SignInButton
            style={{
              backgroundColor: "#FFCD4A",
              color: "white",
              borderRadius: 5,
              width: "150px",
              height: "30px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            로그인
          </SignInButton>
        ) : (
          <Link href="/Profile">
            <Button
              variant="gradient"
              gradient={{ from: "yellow", to: "#FFCD4A", deg: 105 }}
            >
              <Text
                style={{
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {ethos.truncateMiddle(wallet?.address, 4)}
              </Text>
            </Button>
          </Link>
        )}
      </Container>
    </Header>
  );
}
