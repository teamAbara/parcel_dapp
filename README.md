# 2023 공개SW 개발자대회

## 프로젝트명 : Delivery system using blockchain 📦
![1](https://github.com/teamAbara/parcel_dapp/assets/88940298/484b0bf0-75e8-464e-b49b-2122617c19b3)

## 팀명 : 아바라 ☕

## 팀원

- 장아라|데이터분석|디자인|:https://github.com/purin96
- 한경현|블록체인|:https://github.com/kyunghyunHan

## 개발 목적 배경

- 개인정보 유출로 인한 범죄가 나날이 늘어가고 있습니다.특히 택배에는 이름,연락처,주소가 노출되어 범죄의 타겟이 되고 있습니다.서울의 한 살인사건에도 택배송장을 이용해 피해자의 주소를 알아내어 범죄가 발생하였으며,스토킹 강도 살인사건같은 강력 범죄에 택배송장으로부터 얻은 개인정보가 악용됩니다.이러한 개인정보 유출사건을 방지하기위해 택배에도 QrCode와 블록체인을 결합하여 이러한문제를 해결할수 없을까 하여 서비스를 개발하게 되었습니다.
![3](https://github.com/teamAbara/parcel_dapp/assets/88940298/472fcde9-e9ad-4af5-a838-53fecc43f3db)



- [기사1](https://www.asiatoday.co.kr/view.php?key=20210413010007288)
- [기사2](http://www.bizwnews.com/news/articleView.html?idxno=27545)

## 개발환경 언어

### 1.웹

- typescript
- next-js
- node js

### 2.앱

- typescript
- react-native

### 3.블록체인

- Sui Network
- Move(smart contract language)
- Infura Ipfs

## 시스템 구성 및 아키텍처

## 프로젝트 주요기능

### 지갑으로 로그인(web)

#### - ethos wallet으로 간편하게 회원가입 없이 로그인 을 할수 있습니다.

![ezgif com-video-to-gif](https://github.com/teamAbara/parcel_dapp/assets/88940298/c0aa29c7-39e7-4127-ac2d-4791705dc934)

#### - ethos wallet으로 간편하게 로그아웃 을 할수 있습니다.

![ezgif com-video-to-gif (1)](https://github.com/teamAbara/parcel_dapp/assets/88940298/87456da6-0505-427f-a18e-5f70edce61b2)

### 택배예약(web)

#### - infura ipfs 에 택배 예약 내역을 cid로 저장하며 url을 Sui Network에 저장합니다.

![3 택배예약](https://github.com/teamAbara/parcel_dapp/assets/88940298/b3918652-f7d7-4ff3-ad26-28341104d7d7)

### 택배 확인(web)

#### - 마이페이지에서 자신이 보낸 택배와  받은 택배목록 및 최신 내역을  확인할수 있으며 클릭하게 되면 상세 페이지로 넘어가 더욱 자세한 상세 내용 및 현재 처리과정등을 확인할수 있으며  Qr코드를 확인 및 인쇄를 할수 있습니다. 

![4인쇄](https://github.com/teamAbara/parcel_dapp/assets/88940298/77eb5b25-4287-42e9-b8c8-5634834d9772)

#### - 또한 상세 택배조회를 통해서도 상세페이지로 들어갈수 있습니다.

![5 택배조회](https://github.com/teamAbara/parcel_dapp/assets/88940298/e65d620e-aab0-447f-8afa-d9b26a12cafd)

### 택배기사 로그인(app)

#### - 택배기사는 아이디 패스워드를 입력하며 지역정보를 입력하여 회원가입및 로그인을 할 수 있습니다

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/9ccf45c7-e9f6-44fd-bfaf-a700dfa61e67"  width="30%" height="30%">
<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/cf52ae67-2985-47eb-bf58-e99d48f4799a"  width="30%" height="30%">
<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/093597ce-fcf6-4b41-a1d6-436cbe1a9d91"  width="30%" height="30%">

#### - 로그인을 하게되면 프로필을 눌러 개인정보를확인할수 있으며, 택배기사의 지갑 주소 복사 및 로그아웃을 할수 있습니다.

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/5490cdbb-4a72-46be-b5ea-0d4656bcf4ea"  width="30%" height="30%">

### 메인페이지(app)

#### - 로그인을하게되면 메인페이지로 이동하는데 맨위에 접속중인 프로필 내용을 확인할수 있으며 밑에는 스캔 및 할당된 리스트등 이 있습니다 

<img src ="https://github.com/teamAbara/parcel_dapp/assets/121744538/83230e43-d489-4d49-981a-a774b897d38d"  width="30%" height="30%">

### 택배기사 택배확인(app)

#### - 택배기사는 택배 상자에 있는 qr코드를 스캔하여 사용자의 택배 내역을 확인을 할수 있으며 처리버튼 눌러 처리단계를 업데이트 할수 있습니다.

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/5f6b85e7-258b-44c3-bdcd-2010fb529202"  width="30%" height="30%">

#### - 택배기사는 택배리스트를 통해 할당된 택배 목록을 확인할수 있으며 누르면 상세한 정보까지 확인할수 있습니다.

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/a2ee0886-1cfe-4a23-9086-ab05fb27c38a"  width="30%" height="30%">
<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/6f6d9445-84ec-495e-8a83-dcf0889c3eb9"  width="30%" height="30%">

## 기대효과 및 활용분야

- 기존 택배에는 이름,연락처,주소가 입력되어 있어 이 개인정보가 노출되어 범죄에 악용될수 있엇습니다.하지만 이를 막아 개인정보 유출 범죄를 예방할수 있으며,블록체인 smart contract로 인해 간단한 로직으로도 택배시스템을 구축할수 있으며,간단하게 지갑으로 결제할수 있습니다.
