import { TableSort } from "@/components/Courierinquiry/Courierinquiry";
import { useEffect, useState } from "react";
import CourierinquiryLogo from "@img/Courierinquiry.png";
import Image from "next/image";
//택배 조회 사이트
export default function Courierinquiry() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <div style={{ marginTop: 150, backgroundColor: "white" }}>
          <Image
            src={CourierinquiryLogo}
            alt="Picture of me"
            style={{ width: "100%", height: "100%" }}
          />
          <TableSort />
        </div>
      </>
    )
  );
}
