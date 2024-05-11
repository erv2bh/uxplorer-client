# 📖 UXPlorer

<div align="center">
<img width="300px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/d4461e65-deb6-4593-bda5-67fa812eba12" />

### UXPlorer는 서비스 출시 전 사용성 테스트를 위한 기업 대상 웹 애플리케이션입니다.

UXPlorer는 디자이너와 개발자, 그리고 사용자 사이의 소통의 벽을 허물고자 하는 취지에서 시작되었습니다. 오프라인에서 한정적으로 진행되던 UX 테스트를 온라인으로 전환, 개발 초기 단계에서부터 광범위한 사용자 피드백을 실시간으로 수집 및 반영할 수 있는 소통 창구 역할을 합니다. 이를 통해, 서비스 이용자(기업)는 웹 서비스를 사용자 중심으로 개선하고, 사용자 만족도와 서비스 사용성을 최대화할 수 있습니다. UXPlorer는 웹 서비스가 사용자에게 직관적이고 접근성 높게 디자인되었는지 검증하는 **Usability Test**에 초점을 맞추고 있습니다.

<br>
</div>

## Links

<p align="center" style="display: flex; justify-content: space-evenly;">
  <a href="https://web.ux-plorer.com">Deployed website</a>
  <span> | </span>
  <a href="https://github.com/erv2bh/uxplorer-client">Frontend Repository</a>
  <span> | </span>
  <a href="https://github.com/erv2bh/uxplorer-server">Backend Repository</a>
</p>

## **Table of Contents**
- [Features](#-features)
- [Challenges](#-challenges)
  - [1. 서비스 이용자 환경과 테스트 환경을 어떻게 구분할 수 있을까?](#1-서비스-이용자-환경과-테스트-환경을-어떻게-구분할-수-있을까)
    - [1-1 스키마 설계의 차이](#1-1-스키마-설계의-차이)
    - [1-2 보안과 접근성](#1-2-보안과-접근성)
    - [1-3 테스트 환경의 독립성](#1-3-테스트-환경의-독립성)
  - [2. 무슨 지표를 어떤 근거로 어떻게 통계화 할 수 있을까?](#2-무슨-지표를-어떤-근거로-어떻게-통계화-할-수-있을까)
    - [2-1 정량적 지표를 온라인상에서 어떻게 통계화 할 수 있을까?](#2-1-정량적-지표를-온라인상에서-어떻게-통계화-할-수-있을까)
    - [2-2 정성적 지표를 온라인상에서 어떻게 통계화 할 수 있을까?](#2-2-정성적-지표를-온라인상에서-어떻게-통계화-할-수-있을까)
- [Tech Stacks](#-tech-stacks)
- [Schedule](#-schedule)

<br>

## 📟 Features

### **새로운 테스트 생성 기능**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/ad82ca36-71c9-4f89-8ae8-50e53d7aca9d" />
</p>

- 서비스 이용자는 서비스를 테스트하기 위한 테스트를 만들 수 있습니다.
  - 테스트 이름, 테스트 상세 설명, 테스트 URL, 테스터 이메일, 마감 날짜를 입력합니다.
  - 테스트에서 진행할 미션과 미션별 예상 소요시간을 입력합니다.

<br>

### **테스트 세부 정보 및 결과 보기 기능**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/5f18f55e-cf00-4ac0-8a08-660ff7fed831" />
</p>

- 서비스 이용자는 생성한 테스트에 대한 세부 정보 및 결과를 볼 수 있습니다.
  - 통합 결과의 경우 미션 수행률, 미션별 평균 소요시간, 서비스 만족도 및 추천 지수의 통계가 그래프로 나타납니다.
  - 유저별 결과의 경우 유저별 세부 미션 수행사항 및 피드백 정보가 보여집니다.

<br>

### **테스터**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/6174be14-5031-4a69-bcfd-26deaa63bea4" />
</p>

- 테스터는 테스트 환경에서 UX 테스트를 진행 할 수 있습니다.
  - 화면 녹화 공유 기능을 제공함으로써 정량적 지표를 뒷받침 해줍니다.
  - 테스트 완료 후 테스터가 설문 작성을 할 수 있도록 설문 페이지를 제공합니다.

<br>

## 🏔️ Challenges

### 1. 서비스 이용자 환경과 테스트 환경을 어떻게 구분할 수 있을까?

서비스 이용자 환경과 테스트 환경을 구분하는 것은 핵심 챌린지 요소 중 하나였습니다. 이를 위해, **User**와 **Tester**의 스키마를 구분하였습니다. 여기서 **User**는 서비스 이용자를 의미하며, **Tester**는 테스트에 참여하는 사용자를 지칭합니다. 각각의 환경을 구분하기 위한 세가지 포인트는 다음과 같습니다.

<br>

#### 1-1 스키마 설계의 차이

- **User 스키마**는 서비스 이용자의 기본 정보를 담고 있습니다. 여기에는 이메일, 사용자 이름, 생성한 테스트 목록 등이 포함되며, Google Firebase Auth를 통한 로그인 기능을 구현하여 보안성을 강화하였습니다.

<br>

- **Tester 스키마**는 테스트 참여자의 정보를 관리합니다. 초기 설계에서는 테스터별로 참여한 테스트 정보와 녹화된 화면 URL, 설문 응답 등을 저장했으나, 최종 설계에서는 테스터의 이메일, 로그인 상태, 참여한 미션 정보를 저장하도록 변경하였습니다. 동일한 이메일 주소로 여러 테스트에 참여할 수 있다고 판단하였기 때문에 이메일 주소를 unique하지 않도록 변경하였습니다. 테스터의 이메일을 통해 테스트 생성 시 테스터 ID를 할당하고 난수를 사용해 비밀번호를 생성하여 테스트 접근성을 보장하도록 구현하였습니다.

<br>

#### 1-2 보안과 접근성

- **서비스 이용자**는 Firebase Auth를 통해 인증하며, 생성한 테스트를 관리할 수 있습니다. 테스트를 생성하고 수정할 수 있는 권한을 서비스 이용자에게 부여하여, 테스터는 오직 참여 권한만을 가지도록 구현하였습니다. 이는 UXPlorer 내에서의 역할과 권한을 명확히 구분하며, 각 사용자가 수행할 수 있는 작업을 제어하는 데 중요한 요소로 작용하였습니다.

<br>

- **테스터**는 서비스 이용자에 의해 생성된 테스트에만 접근할 수 있으며, 이는 고유한 ID와 비밀번호를 통해 이루어집니다. 이는 테스트 환경을 안전하게 격리시키며, 무작위 참여를 방지합니다. 또한 동일한 테스트의 반복 참여를 방지하기 위해 테스터의 테스트 참여 여부 필드를 추가해주었습니다.

<br>

#### 1-3 테스트 환경의 독립성

- UXplorer는 테스터가 참여하는 각 테스트 환경을 독립적으로 관리합니다. 이는 **Tester** 스키마에서 각 테스터가 참여한 미션과 설문 응답 등을 별도로 저장하도록 구현하였습니다. 테스터의 행동 패턴과 피드백을 보다 직관적으로 분석하는데 용이하고 정확한 UX 피드백을 제공할 수 있게 합니다.

<br>

### 2. 무슨 지표를 어떤 근거로 어떻게 통계화 할 수 있을까?

정량적 지표와 정성적 지표를 기반으로 한 통계가 보다 객관적인 데이터를 제공할 수 있습니다.

더욱이 **UXPlorer**의 경우 온라인 플랫폼이다 보니 두가지 지표가 절대적이라고 볼 수 있습니다.

<br>

#### 2-1 정량적 지표를 온라인상에서 어떻게 통계화 할 수 있을까?

- ***UX KPIs(Key Performance Indicators)** - UX 성과 지표 기준으로 통계 시각화*
    - ***Task Success Rate (필요한 것을 찾아 해결한 사람이 몇명인지…)***
    - ***Time on Task (필요한 것을 얼마나 빨리 찾아 끝냈는지…)***
    - ***System Usability Scale : SUS (제품에 얼마나 만족을 하는지…) 질문지***
    - *Use of Search vs. Navigation (필요한 것을 찾기 위해 몇명이 내비게이션을 사용하고 몇명이 검색 기능을 썼는지…)*
    - *User Error Rate(오류가 몇번 발생했는지… 어떻게 해서 그런 오류가 떳는지…)*

오프라인에서 진행하는 UX 테스트의 경우 대개 위의 다섯가지 지표를 토대로 통계를 냅니다.

온라인에서 구현 가능한 지표를 추려보니

- **미션 수행률 : 미션별 통과 여부 통계 시각화**
- **미션 소요시간 : 미션별 소요시간 통계 시각화**
- **서비스 만족도 점수: System Usability Scale 을 토대로 서비스 만족도 통계 시각화**

위의 세가지 지표를 정량화 할 수 있었습니다.

1. **미션 수행률** - 각 테스트 별로 서비스 이용자(기업)가 테스터들에게 제공할 미션을 작성할 수 있습니다. 서비스 이용자는 테스터의 미션 성공 여부를 어떻게 판단할 수 있을까요? 이를 위해 각 미션지에 `건너뛰기` 항목을 부여해 주어 테스터가 자발적으로 미션을 수행하지 못하였다는 근거로 수행 여부를 데이터화 하였습니다. `건너뛰기`의 경우 서비스 이용자가 미션을 작성할 때 미션별 예상 소요시간을 설정해 두고 예상 소요시간이 경과하면 테스터가 `건너뛰기` 항목을 선택할 수 있게 하였습니다. 테스터가 미션을 건너뛰었을 경우 해당 미션은 실패로 간주됩니다.

  ```jsx
  //src/components/Modal/MissionModal.jsx

  function handleSkipMission() {
    //...

    const skippedMissionData = {
      completed: false,
    };

    //...
  }

  {data?.expectedDuration && missionTime > data.expectedDuration && (
    <SkipButton onClick={handleSkipMission}>건너뛰기</SkipButton>
  )}
  ```

2. **미션 소요시간** - 각 미션별로 테스터가 미션을 완료한 시간을 알 수 있다면, 그리고 서비스 이용자가 서비스 기획 시 해당 기능을 완료할거라는 예상 소요시간에 대한 정보가 있다면 미션 소요시간을 통계화 하여 정량적 지표로 삼을 수 있습니다. 이 때 미션 소요시간의 데이터는 성공한 미션에 한정하여 통계에 사용합니다. 따라서 테스터가 `건너뛰기` 항목을 선택하였을 경우의 데이터는 무시됩니다.

3. **서비스 만족도 점수** - 설문지 작성을 통하여 테스터는 서비스 이용에 대한 만족도를 평가할 수 있고 이는 수치화 시킬 수 있으며 당연히 서비스 이용자에게 제공됩니다. 서비스 이용자는 수치화된 테스터별 만족도를 그래프화 하여 시각적으로 비교 할 수 있습니다.

위의 세가지 지표는 어디까지나 테스터의 재량에 맡기게 되어 온라인상에서 완벽한 데이터를 추출하는 데에는 한계가 있다고 생각했습니다. 따라서 **UXPlorer**는 ***화면녹화*** ***기능***을 제공하여 온라인 상에서 테스터를 Observation 하는 용도로 사용하고 서비스 이용자는 테스터의 화면 녹화본을 추가적인 정량적 지표를 보는데에 사용할 수 있게 하였습니다.

<br>

#### 2-2 정성적 지표를 온라인상에서 어떻게 통계화 할 수 있을까?

1. **테스터의 적극적인 참여** - 테스터는 미션 수행 시 미션에 관하여 피드백을 자유롭게 남길 수 있습니다. 이 피드백은 서비스 이용자에게 제공되며 테스터의 의견을 적극 반영할 수 있게 됩니다.

2. **NPS 점수** - NPS 점수는 기업이나 제품의 고객 충성도와 만족도를 간단하면서도 효과적으로 측정하는 지표입니다. 이 점수는 고객이 제품이나 서비스를 다른 사람에게 추천할 가능성을 0부터 10까지의 척도로 나타내며, 이를 통해 추천자, 중립자, 비평자의 세 그룹으로 분류합니다.

<br>

## 🛠 Tech Stacks

### Client

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![Jotai](https://img.shields.io/badge/Jotai-000?style=for-the-badge&logoColor=white) ![Styled-Components](https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white)


### Server

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Test

![React Dom Testing](https://img.shields.io/badge/react%20dom%20testing-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vitest](https://img.shields.io/badge/Vitest-%2344A833.svg?style=for-the-badge&logoColor=white)

### Deployment

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br>

## 🗓️ Schedule
### **프로젝트 기간: 2024.03.04(월) ~ 2024.03.27(수)**

<br>

**1 주차: 아이디어 선정, POC, 목업 및 DB스키마 설계**

<br>

**2 - 3주차: 클라이언트 구현 및 서버 구현**
