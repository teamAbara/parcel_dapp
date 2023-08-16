import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ParcelDetailComponent } from "@/components/ParcelDetail/ParcelDetailComponent";
export default function ParcelDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <div style={{ marginTop: 150 }}>
          <ParcelDetailComponent />
        </div>
      </>
    )
  );
}
