import { useEffect, useState } from "react";
import { MainBenner } from "@/components/main/main_benner";
import { ethos, TransactionBlock, SignInButton } from "ethos-connect";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const { wallet } = ethos.useWallet();

  useEffect(() => {
    const providers = async () => {
      if (!wallet) return;
      if (!process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT) return;
      const nft = await wallet.provider.getObject({
        id: process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT,
        options: {
          showContent: true,
        },
      });
      console.log(nft);
      const data = nft.data;
      console.log(data);
      if (data && nft.data?.content?.dataType === "moveObject") {
        console.log(nft.data?.content.fields.value);
      }
    };
    providers();
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
