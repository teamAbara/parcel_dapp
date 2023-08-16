"use client";

import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";

const useStyles = createStyles(theme => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface RowData {
  id: string;
  FromAddress: string;
  ToAddress: string;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter(item =>
    keys(data[0]).some(key => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSort() {
  const data = [
    {
      id: "Athena Weissnat",
      ToAddress: "Little - Rippin",
      FromAddress: "Elouise.Prohaska@yahoo.com",
    },
    {
      id: "Deangelo Runolfsson",
      ToAddress: "Greenfelder - Krajcik",
      FromAddress: "Kadin_Trantow87@yahoo.com",
    },
    {
      id: "Danny Carter",
      ToAddress: "Kohler and Sons",
      FromAddress: "Marina3@hotmail.com",
    },
    {
      id: "Trace Tremblay PhD",
      ToAddress: "Crona, Aufderhar and Senger",
      FromAddress: "Antonina.Pouros@yahoo.com",
    },
    {
      id: "Derek Dibbert",
      ToAddress: "Gottlieb LLC",
      FromAddress: "Abagail29@hotmail.com",
    },
    {
      id: "Viola Bernhard",
      ToAddress: "Funk, Rohan and Kreiger",
      FromAddress: "Jamie23@hotmail.com",
    },
    {
      id: "Austin Jacobi",
      ToAddress: "Botsford - Corwin",
      FromAddress: "Genesis42@yahoo.com",
    },
    {
      id: "Hershel Mosciski",
      ToAddress: "Okuneva, Farrell and Kilback",
      FromAddress: "Idella.Stehr28@yahoo.com",
    },
    {
      id: "Mylene Ebert",
      ToAddress: "Kirlin and Sons",
      FromAddress: "Hildegard17@hotmail.com",
    },
    {
      id: "Lou Trantow",
      ToAddress: "Parisian - Lemke",
      FromAddress: "Hillard.Barrows1@hotmail.com",
    },
    {
      id: "Dariana Weimann",
      ToAddress: "Schowalter - Donnelly",
      FromAddress: "Colleen80@gmail.com",
    },
    {
      id: "Dr. Christy Herman",
      ToAddress: "VonRueden - Labadie",
      FromAddress: "Lilyan98@gmail.com",
    },
    {
      id: "Katelin Schuster",
      ToAddress: "Jacobson - Smitham",
      FromAddress: "Erich_Brekke76@gmail.com",
    },
    {
      id: "Melyna Macejkovic",
      ToAddress: "Schuster LLC",
      FromAddress: "Kylee4@yahoo.com",
    },
    {
      id: "Pinkie Rice",
      ToAddress: "Wolf, Trantow and Zulauf",
      FromAddress: "Fiona.Kutch@hotmail.com",
    },
    {
      id: "Brain Kreiger",
      ToAddress: "Lueilwitz Group",
      FromAddress: "Rico98@hotmail.com",
    },
  ];
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map(row => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.FromAddress}</td>
      <td>{row.ToAddress}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "id"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("id")}
            >
              id
            </Th>
            <Th
              sorted={sortBy === "FromAddress"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("FromAddress")}
            >
              FromAddress
            </Th>
            <Th
              sorted={sortBy === "ToAddress"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("ToAddress")}
            >
              ToAddress
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
