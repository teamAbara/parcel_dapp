import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ethos, TransactionBlock } from "ethos-connect";
import { ParcelData } from "@/util/type";
import { ParcelDetailComponent } from "@/components/ParcelDetail/ParcelDetailComponent";
export default function ParcelDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [mounted, setMounted] = useState(false);
  const { wallet } = ethos.useWallet();
  const [parcel_list, setParcelList] = useState<ParcelData | undefined>();

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const providers = async () => {
      //지갑이 없으면 리턴
      if (!wallet) return;
      //오브젝트 id가 없으면 리턴
      if (!process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT) return;
      //오브젝트 id 불러와서 컨텐츠 불러오기
      const data = await wallet.provider.getObject({
        id: process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT,
        options: {
          showContent: true,
        },
      });
      if (data && data.data?.content?.dataType === "moveObject") {
        let data_arr = [];
        for (let i = 0; i < data.data?.content.fields.parcel_counter; i++) {
          data_arr.push(data.data?.content.fields.parcel_list[i].fields);
        }
        const parcel_list_arr = data_arr.filter(item => item.id == id);

        setParcelList(parcel_list_arr[0]);
      }
    };
    providers();
  }, [wallet]);
  console.log(parcel_list);
  return (
    mounted &&
    parcel_list && (
      <>
        <div style={{ marginTop: 150 }}>
          {parcel_list ? (
            <ParcelDetailComponent
              parcel_list={parcel_list}
              from_account={parcel_list.from_address}
              to_account={parcel_list.to_address}
              worker_account={parcel_list.worker_address}
              progress={parcel_list.progress}
            />
          ) : null}
        </div>
      </>
    )
  );
}
