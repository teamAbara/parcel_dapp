/*====================설정===================== */
const next = require("next");
const express = require("express");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const { sequelize, DeliveryWorker } = require("./model/index.js");
/*====================설정===================== */
/*====================sui===================== */
const sui = require("@mysten/sui.js");
const Ed25519Keypair = sui.Ed25519Keypair;
const JsonRpcProvider = sui.JsonRpcProvider;
const RawSigner = sui.RawSigner;
const Connection = sui.Connection;
const TransactionBlock = sui.TransactionBlock;
const fromB64 = sui?.fromB64;
const DEVNET_FAUCET_URL = "https://faucet.testnet.sui.io/gas";
const { fromHEX } = require("@mysten/bcs");
const connection = new Connection({
  fullnode: "https://fullnode.testnet.sui.io",
});

const provider = new JsonRpcProvider(connection, {
  skipDataValidation: false,
  faucetURL: DEVNET_FAUCET_URL,
});
/*====================sui===================== */

// DB와 연결
sequelize
  // sync : MySQL에 테이블이 존재 하지 않을때 생성
  //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(err => {
    console.error(err);
  });
dotenv.config();

app.prepare().then(() => {
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  /*======================== USER =============================== */
  /* 택배기사 회원가입 */
  server.post("/auth/sign_up", async (req, res) => {
    //아이디,비밀번호,주소 받아서
    const { worker_id, worker_pw, worker_address } = req.body;
    //sui keypair 생성
    const keypair = new Ed25519Keypair();
    //주소
    const publickey = keypair.getPublicKey().toSuiAddress().toString();
    //프라이빗 키
    const privateKey = `0x${Buffer.from(
      fromB64(keypair.export().privateKey).slice(0, 32)
    ).toString("hex")}`;
    //db에 저장
    console.log("pub", publickey);
    console.log("pv", privateKey);
    await DeliveryWorker.create({
      worker_id: worker_id,
      worker_pw: worker_pw,
      worker_address: worker_address,
      worker_public: publickey,
      worker_private: privateKey,
    })
      .then(data => {
        res.send({ result: true });
      })
      .catch(err => {
        console.error(err);
        res.send({ result: false });
      });
  });

  /*택배기사 로그인 */
  server.post("/auth/login", async (req, res) => {
    const { worker_id, worker_pw } = req.body;
    try {
      //db에 받은 아이디로 검색
      await DeliveryWorker.findOne({
        where: { worker_id: worker_id },
      }).then(data => {
        if (data.worker_pw !== worker_pw) {
          res.send({
            result: false,
            msg: "비밀번호가 틀렸습니다.",
          });
        } else {
          const refresh_token = jwt.sign(
            { worker_id: worker_id },
            process.env.JWT_USER,
            {
              algorithm: "HS256", // 해싱 알고리즘
              expiresIn: "1d", // 토큰 유효 기간
              issuer: "issuer", // 발행자
            }
          );
          DeliveryWorker.update(
            { token: refresh_token },
            { where: { worker_id: worker_id } }
          )
            .then(res => {
              return refresh_token;
            })
            .catch(err => {
              console.log(err);
            });

          const access_token = jwt.sign(
            { worker_id: worker_id },
            process.env.JWT_USER,
            {
              algorithm: "HS256", // 해싱 알고리즘
              expiresIn: "30m", // 토큰 유효 기간
              issuer: "issuer", // 발행자
            }
          );
          res.send({
            result: true,
            worker_id: worker_id,
            access_token: access_token,
            refresh_token: refresh_token,
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ result: false });
    }
  });

  //유저 정보 받아오기
  server.post("/auth/get_user", async (req, res) => {
    const { worker_id } = req.body;
    const worker = await DeliveryWorker.findOne({
      where: { worker_id: JSON.parse(worker_id) },
    });
    console.log(worker);
    res.send({ result: true, worker: worker });
  });
  /*======================== USER =============================== */
  /*======================== Parcel =============================== */

  //전체 택배 리스트 가져오기
  server.post("/parcel/all_parcel_list", async (req, res) => {
    //택배 리스트 조회
    const data = await provider.getObject({
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

      res.send({ result: true, arr: data_arr });
    }
  });

  //할당된 데이터
  server.post("/parcel/worker_parcel_list", async (req, res) => {
    const worker = await DeliveryWorker.findOne({
      where: { worker_id: 12341 },
    });
    try {
      //택배 리스트 조회
      const data = await provider.getObject({
        id: process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT,
        options: {
          showContent: true,
        },
      });
      let data_arr = [];
      for (let i = 0; i < data.data?.content.fields.parcel_counter; i++) {
        //배당된 기사 만 볼수 있게
        if (
          worker.worker_public ==
          data.data?.content.fields.parcel_list[i].fields.worker_address
        ) {
          const meta_data_list = await axios.get(
            `${process.env.NEXT_PUBLIC_IPFS_ADDR}/${data.data?.content.fields.parcel_list[i].fields.url}`
          );
          meta_data_list.data.progress =
            data.data?.content.fields.parcel_list[i].fields.progress;
          data_arr.push(meta_data_list.data);
        }
      }
      res.send({ result: true, arr: data_arr });
    } catch (error) {
      console.log(error);
      res.send({ result: false });
    }
  });
  //전체 메타데이터
  server.post("/parcel/all_parcel_list_metadata", async (req, res) => {
    //택배 리스트 조회

    try {
      const data = await provider.getObject({
        id: process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT,
        options: {
          showContent: true,
        },
      });
      let data_arr = [];
      for (let i = 0; i < data.data?.content.fields.parcel_counter; i++) {
        const meta_data_list = await axios.get(
          `${process.env.NEXT_PUBLIC_IPFS_ADDR}/${data.data?.content.fields.parcel_list[i].fields.url}`
        );
        meta_data_list.data.progress =
          data.data?.content.fields.parcel_list[i].fields.progress;
        data_arr.push(meta_data_list.data);
      }
      console.log("11");
      res.send({ result: true, arr: data_arr });
    } catch (error) {
      console.log(error);
      res.send({ result: false });
    }
  });
  //택배 다음 단계로 변경
  server.post("/parcel/update_parcel_progress", async (req, res) => {
    //아이디 받아서
    const worker_id = req.body.worker_id;

    const worker = await DeliveryWorker.findOne({
      where: { worker_id: worker_id },
    });
    const keypair = Ed25519Keypair.fromSecretKey(
      fromHEX(worker.worker_private)
    );
    const signer = new RawSigner(keypair, provider);
    //move 함수 호출

    //성공하면 true,실패하면 false
    try {
      const transactionBlock = new TransactionBlock();
      transactionBlock.moveCall({
        target: `${process.env.NEXT_PUBLIC_SUI_PACKAGE.toString()}::parcel::next_parcel_progress`,
        arguments: [
          transactionBlock.object(
            process.env.NEXT_PUBLIC_PARCEL_LIST_OBJECT.toString()
          ),
          transactionBlock.pure(1),
        ],
      });
      //트랙잭션
      const response = await signer.signAndExecuteTransactionBlock({
        transactionBlock,
        options: {
          showInput: true,
          showEffects: true,
          showEvents: true,
          showBalanceChanges: true,
          showObjectChanges: true,
        },
      });
      //성공하면 true,
      res.send({ result: true });
    } catch (error) {
      //실패하면 false
      res.send({ result: false });
    }
  });
  //택배 스캔
  server.post("/parcel/get_parcel", async (req, res) => {
    const { worker_id, id } = req.body;

    const worker = await DeliveryWorker.findOne({
      where: { worker_id: 12341 },
    });
    //택배기사가 아니면 리턴대게
    if (worker == null) return;
    //택배 리스트 조회
    const data = await provider.getObject({
      id: process?.env?.NEXT_PUBLIC_PARCEL_LIST_OBJECT,
      options: {
        showContent: true,
      },
    });
    let data_arr = [];
    for (let i = 0; i < data.data?.content.fields.parcel_counter; i++) {
      const meta_data_list = await axios.get(
        `${process.env.NEXT_PUBLIC_IPFS_ADDR}/${data.data?.content.fields.parcel_list[i].fields.url}`
      );

      if (meta_data_list.data.id == id) {
        data_arr.push(meta_data_list.data);
      }
    }
    console.log(data_arr);
    res.send({ result: true, arr: data_arr[0] });
  });

  /*======================== Parcel =============================== */

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
