import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export function AlertComponent(props: any) {
  const { data } = props;
  return (
    <Alert
      icon={<IconAlertCircle size="1rem" />}
      title="Bummer!"
      color="red"
      variant="filled"
      withCloseButton
      closeButtonLabel="Close alert"
    >
      {data}
    </Alert>
  );
}
