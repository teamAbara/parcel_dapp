import { SimpleGrid, Container, Stack, Button, Grid } from "@mantine/core";
import { useEffect } from "react";
export function ParcelDetailComponent(props: any) {
  const { parcel_list } = props;
  useEffect(() => {
    if (!parcel_list) return;
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
                  height: 800,
                  margin: 10,
                  borderRadius: 20,
                }}
              >
                <SimpleGrid
                  cols={1}
                  breakpoints={[{ maxWidth: "xs", cols: 1 }]}
                ></SimpleGrid>
              </div>
            }
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  );
}
