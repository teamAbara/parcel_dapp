# 2023 공개SW 개발자대회

## 프로젝트명 : Delivery system using blockchain 📦

![21](https://github.com/teamAbara/parcel_dapp/assets/88940298/c67912c5-7a18-41fd-a191-f9ec974dd037)

## 팀명 : 아바라 ☕

## 팀원

- 장아라|데이터분석|디자인|:https://github.com/purin96
- 한경현|블록체인|:https://github.com/kyunghyunHan

## 개발 목적 배경

- 최근 개인정보 유출로 인한 범죄가 나날이 늘어가고 있습니다.
 특히 택배에는 이름, 연락처, 주소가 나와 있어 범죄에 노출되기 쉽습니다. 얼마 전 서울에서 일어난 한 살인사건은 택배 송장을 이용해 피해자의 주소를 알아내어 범죄가 발생하였으며, 스토킹 및 강도 같은 강력 범죄 사건에 택배 송장으로부터 개인정보를 알아내어 이를 악용한다고 합니다.

택배에 Qr Code와 블록체인을 결합하면 이러한 개인정보 유출 문제를 해결할 수 있을까 하여 서비스를 개발하게 돼었습니다.
![3](https://github.com/teamAbara/parcel_dapp/assets/88940298/e281b459-6217-437d-b169-68cd733f1a4b)
![KakaoTalk_20230907_182342519](https://github.com/teamAbara/parcel_dapp/assets/121744538/f9e302c5-5625-475c-aa60-b24fa94e2572)

![KakaoTalk_20230907_182346252](https://github.com/teamAbara/parcel_dapp/assets/121744538/11f2ab0f-ca93-4185-b853-5eb564e1514f)


![6](https://github.com/teamAbara/parcel_dapp/assets/88940298/9a5bf121-74c6-4a0b-8c01-44eaaaeaa7f4)

- [기사1](https://www.asiatoday.co.kr/view.php?key=20210413010007288)
- [기사2](http://www.bizwnews.com/news/articleView.html?idxno=27545)

## 개발환경 언어
![7](https://github.com/teamAbara/parcel_dapp/assets/88940298/e02ea81b-580e-45e8-96d6-afd2c465f7bb)

### 1.웹

- typescript
- next-js
- node js

### 2.[앱](https://github.com/teamAbara/parcel_app)

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
![1 로그인](https://github.com/teamAbara/parcel_dapp/assets/88940298/0bb095fc-f0c3-459b-bbd4-59a3232eea2e)


#### - ethos wallet으로 간편하게 로그아웃 을 할수 있습니다.
![2 로그아웃](https://github.com/teamAbara/parcel_dapp/assets/88940298/ae0ecb5b-5015-4834-846e-1d01d0f7b81d)


### 택배예약(web)

#### - infura ipfs 에 택배 예약 내역을 cid로 저장하며 url을 Sui Network에 저장합니다.
![3 택배예약](https://github.com/teamAbara/parcel_dapp/assets/88940298/eb971383-9f59-4155-a661-d16f5919b21a)


### 택배 확인(web)

#### - 마이페이지에서 자신이 보낸 택배와  받은 택배목록 및 최신 내역을  확인할수 있으며 클릭하게 되면 상세 페이지로 넘어가 더욱 자세한 상세 내용 및 현재 처리과정등을 확인할수 있으며  Qr코드를 확인 및 인쇄를 할수 있습니다. 
![4인쇄](https://github.com/teamAbara/parcel_dapp/assets/88940298/87441909-6df5-48f6-a3b2-5f528bd13049)


#### - 또한 상세 택배조회를 통해서도 상세페이지로 들어갈수 있습니다.
![5 택배조회](https://github.com/teamAbara/parcel_dapp/assets/88940298/3d8b8465-5f55-4f87-8611-d2826ffed630)


### 택배기사 로그인(app)

#### - 택배기사는 아이디 패스워드를 입력하며 지역정보를 입력하여 회원가입및 로그인을 할 수 있습니다

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/81f8972e-29c3-4310-944e-253784f78150"  width="30%" height="30%">
<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/81952b64-2d2c-45ed-bcc4-a54d32c8d78e"  width="30%" height="30%">
<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/e825110a-83bb-4157-b5b1-3e9b4ff3f6ac"  width="30%" height="30%">

#### - 로그인을 하게되면 프로필을 눌러 개인정보를확인할수 있으며, 택배기사의 지갑 주소 복사 및 로그아웃을 할수 있습니다.

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/5490cdbb-4a72-46be-b5ea-0d4656bcf4ea"  width="30%" height="30%">

### 메인페이지(app)

#### - 로그인을하게되면 메인페이지로 이동하는데 맨위에 접속중인 프로필 내용을 확인할수 있으며 밑에는 스캔 및 할당된 리스트등 이 있습니다 

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/69ba10c0-2a1b-409f-b5c9-c054f0df8147"  width="30%" height="30%">

### 택배기사 택배확인(app)

#### - 택배기사는 택배 상자에 있는 qr코드를 스캔하여 사용자의 택배 내역을 확인을 할수 있으며 처리버튼 눌러 처리단계를 업데이트 할수 있습니다.

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/d925fbf8-5b0a-49b1-87b2-4b0d2f752f25"  width="30%" height="30%">

#### - 택배기사는 택배리스트를 통해 할당된 택배 목록을 확인할수 있으며 누르면 상세한 정보까지 확인할수 있습니다.

<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/94f4e65a-fc09-4001-8698-e9e555680679"  width="30%" height="30%">
<img src ="https://github.com/teamAbara/parcel_dapp/assets/88940298/d7866276-d294-4931-9876-738950c5a14d"  width="30%" height="30%">

## 기대효과 및 활용분야

- 기존 택배에는 이름,연락처,주소가 입력되어 있어 이 개인정보가 노출되어 범죄에 악용될수 있엇습니다.하지만 이를 막아 개인정보 유출 범죄를 예방할수 있으며,블록체인 smart contract로 인해 간단한 로직으로도 택배시스템을 구축할수 있으며,간단하게 지갑으로 결제할수 있습니다.
