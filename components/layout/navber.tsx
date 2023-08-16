"use client";
import { ethos, TransactionBlock } from "ethos-connect";
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
const HEADER_HEIGHT = rem(150);

const useStyles = createStyles(theme => ({
  logo: {},
  inner: {
    height: HEADER_HEIGHT,
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

export function HeaderAction({ links }: HeaderActionProps) {
  const { wallet } = ethos.useWallet();

  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map(link => {
    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        // onClick={event => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });
  // interface TruncatedButtonProps extends ButtonProps {
  //   maxLength: number;
  // }

  return (
    <Header
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0, backgroundColor: "#091140", position: "fixed" }}
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
          <SignInButton>dd</SignInButton>
        ) : (
          <Link href="/Profile">
            <Button
              variant="gradient"
              gradient={{ from: "yellow", to: "#091140", deg: 105 }}
            >
              <Text
                style={{
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {wallet.address}
              </Text>
            </Button>
          </Link>
        )}
      </Container>
    </Header>
  );
}
