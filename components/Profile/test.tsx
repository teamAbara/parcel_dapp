import { Tabs } from "@mantine/core";
import { MyTableSort } from "./MyCourierin";
function Tab() {
  return (
    <Tabs color="teal" defaultValue="from_parcel">
      <Tabs.List
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Tabs.Tab value="from_parcel">보낸 택배</Tabs.Tab>
        <Tabs.Tab value="to_parcel" color="blue">
          받은택배
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="from_parcel" pt="xs">
        <MyTableSort />
      </Tabs.Panel>
      <Tabs.Panel value="to_parcel" pt="xs">
        <MyTableSort />
      </Tabs.Panel>
    </Tabs>
  );
}
export default Tab;
