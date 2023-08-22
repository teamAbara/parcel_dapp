export const worker_pick = (data: number) => {
  const address_list = [
    { type: "인천1", address: "인천광역시 서구 가정동", zonecode: 22783 },
    { type: "인천2", address: "인천광역시 부평구 갈산동", zonecode: 21316 },
  ];

  return address_list.filter(item => item.zonecode == data)[0]?.type;
};
