import { useEffect, useState } from "react";
import { MainBenner } from "@/components/main/main_benner";
import { AlertComponent } from "@/util/Alert";
const Home = () => {
  /*next js에서 page원할하게 가져올려면 데이머 먼저 로딩후에 페이지 렌더링 */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    AlertComponent("dd");
  }, []);
  return (
    mounted && (
      <>
        <div style={{ marginTop: 150, paddingBottom: 150 }}>
          <MainBenner />
        </div>
      </>
    )
  );
};

export default Home;
