import { useEffect, useState } from "react";
import { MainBenner } from "@/components/main/main_benner";
const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <div style={{ marginTop: 150 }}>
          <MainBenner />
        </div>
      </>
    )
  );
};

export default Home;
