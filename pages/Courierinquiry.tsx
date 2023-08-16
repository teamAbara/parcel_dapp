import { TableSort } from "@/components/Courierinquiry/test";
import { useEffect, useState } from "react";

export default function Courierinquiry() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <div style={{ marginTop: 150, backgroundColor: "white" }}>
          <TableSort />
        </div>
      </>
    )
  );
}
