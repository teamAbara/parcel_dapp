import { useEffect, useState } from "react";
import { MainBenner } from "@/components/main/main_benner";
import { LoadingOverlay } from "@mantine/core";
//메인페이지
const Home = () => {
  /*next js에서 page원할하게 가져올려면 데이머 먼저 로딩후에 페이지 렌더링 */
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    setMounted(false);
  }, []);
  //loding추가
  return mounted == true ? (
    <>
      <LoadingOverlay visible={true} overlayBlur={2} />
    </>
  ) : (
    <>
      <div style={{ marginTop: 150, paddingBottom: 150 }}>
        <MainBenner />
      </div>
    </>
  );
};

export default Home;
