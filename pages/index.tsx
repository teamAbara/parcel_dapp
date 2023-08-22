import { useEffect, useState } from "react";
import { MainBenner } from "@/components/main/main_benner";
import { ethos, TransactionBlock, SignInButton } from "ethos-connect";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
