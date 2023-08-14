"use client";

import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import Image from "next/image";

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
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
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
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map(link => {
    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={event => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0, backgroundColor: "#091140" }}
      mb={120}
    >
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          {/* <Image
            src={logo}
            alt="Picture of me"
            style={{ width: "150px", height: "150px" }}
          /> */}
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Button radius="xl" h={30}>
          Get early access
        </Button>
      </Container>
    </Header>
  );
}
