import { ethos } from "ethos-connect";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  Button,
  Container,
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
  from_address: string;
  id: string;
  progress: string;
  to_address: string;
  url: string;
  worker_address: string;
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
  const router = useRouter();
  const { wallet } = ethos.useWallet();
  const [parcel_list, setParcelList] = useState<RowData[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setParcelList(sortData(parcel_list, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setParcelList(
      sortData(parcel_list, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };
  const rows = parcel_list.map(row => (
    <tr key={row.id}>
      <td>
        <Button>{row.id}</Button>
      </td>
      <td>
        <Button
          style={{
            width: "90%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.from_address}
        </Button>
      </td>
      <td>
        {" "}
        <Button
          style={{
            width: "90%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.to_address}
        </Button>
      </td>
      <td>
        <Button
          style={{
            width: "90%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.progress == "1"
            ? "집화처리"
            : row.progress == "2"
            ? "간선상차"
            : row.progress == "3"
            ? "간선하차"
            : row.progress == "4"
            ? "배송출고"
            : "배송완료"}
        </Button>
      </td>
      <td>
        <Button onClick={(e: any) => router.push(`/ParcelDetail/${row.id}`)}>
          자세히
        </Button>
      </td>
    </tr>
  ));
  console.log(rows.length);
  useEffect(() => {
    const providers = async () => {
      if (!wallet) return;
      if (!process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT) return;
      const nft = await wallet.provider.getObject({
        id: process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT,
        options: {
          showContent: true,
        },
      });
      console.log(nft);
      const data = nft.data;
      console.log(data);
      if (data && nft.data?.content?.dataType === "moveObject") {
        let data_arr = [];
        for (let i = 0; i < nft.data?.content.fields.parcel_counter; i++) {
          data_arr.push(nft.data?.content.fields.parcel_list[i].fields);
        }
        setParcelList(data_arr);
      }
    };
    providers();
  }, [wallet]);
  return (
    <Container size="xl">
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
                sorted={sortBy === "from_address"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("from_address")}
              >
                from_address
              </Th>
              <Th
                sorted={sortBy === "to_address"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("to_address")}
              >
                to_address
              </Th>
              <Th
                sorted={sortBy === "progress"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("progress")}
              >
                progress
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(parcel_list).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}
