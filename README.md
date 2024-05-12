# 📖 UXPlorer

<div align="center">
<img width="300px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/d4461e65-deb6-4593-bda5-67fa812eba12" />

### UXPlorer는 서비스 출시 전 사용성 테스트를 위한 기업 대상 웹 애플리케이션입니다.

UXPlorer는 디자이너와 개발자, 그리고 사용자 사이의 소통의 벽을 허물고자 하는 취지에서 시작되었습니다. 오프라인에서 한정적으로 진행되던 UX 테스트를 온라인으로 전환, 개발 초기 단계에서부터 광범위한 사용자 피드백을 실시간으로 수집 및 반영할 수 있는 소통 창구 역할을 합니다. 이를 통해, 서비스 이용자(기업)는 웹 서비스를 사용자 중심으로 개선하고, 사용자 만족도와 서비스 사용성을 최대화할 수 있습니다. UXPlorer는 웹 서비스가 사용자에게 직관적이고 접근성 높게 디자인되었는지 검증하는 **Usability Test**에 초점을 맞추고 있습니다.

<br>
</div>

# Links

<p align="center" style="display: flex; justify-content: space-evenly;">
  <a href="https://web.ux-plorer.com">Deployed website</a>
  <span> | </span>
  <a href="https://github.com/erv2bh/uxplorer-client">Frontend Repository</a>
  <span> | </span>
  <a href="https://github.com/erv2bh/uxplorer-server">Backend Repository</a>
</p>

# Table of Contents
- [Features](#features)
- [Challenges](#challenges)
  - [1. 사용성 테스트](#1-사용성-테스트)
    - [1-1 온라인으로 사용성 테스트를 어떻게 진행할 수 있을까?](#1-1-온라인으로-사용성-테스트를-어떻게-진행할-수-있을까)
    - [1-2 무슨 지표를 어떤 근거로 어떻게 통계화 할 수 있을까?](#1-2-무슨-지표를-어떤-근거로-어떻게-통계화-할-수-있을까)
  - [2. 사용자와 테스터의 구분](#2-사용자와-테스터의-구분)
    - [2-1 로그인 방식을 통해 사용자와 테스터의 역할을 구분할 수 있을까?](#2-1-로그인-방식을-통해-사용자와-테스터의-역할을-구분할-수-있을까)
    - [2-2 테스트 환경을 독립적으로 관리할 수 있을까?](#2-2-테스트-환경을-독립적으로-관리할-수-있을까)
  - [3. 테스트 미션 수행 로직 개선](#3-테스트-미션-수행-로직-개선)
    - [3-1 현재 미션을 완료한 후 다음 미션으로 어떻게 이동할 수 있을까?](#3-1-현재-미션을-완료한-후-다음-미션으로-어떻게-이동할-수-있을까)
    - [3-2 테스터의 피드백을 어떻게 적극적으로 반영하여 시스템을 개선할 수 있을까?](#3-2-테스터의-피드백을-어떻게-적극적으로-반영하여-시스템을-개선할-수-있을까)
- [Tech Stacks](#tech-stacks)
- [Schedule](#schedule)

<br>

# Features

## **새로운 테스트 생성 기능**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/ad82ca36-71c9-4f89-8ae8-50e53d7aca9d" />
</p>

- 서비스 이용자는 서비스를 테스트하기 위한 테스트를 만들 수 있습니다.
  - 테스트 이름, 테스트 상세 설명, 테스트 URL, 테스터 이메일, 마감 날짜를 입력합니다.
  - 테스트에서 진행할 미션과 미션별 예상 소요시간을 입력합니다.

<br>

## **테스트 세부 정보 및 결과 보기 기능**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/5f18f55e-cf00-4ac0-8a08-660ff7fed831" />
</p>

- 서비스 이용자는 생성한 테스트에 대한 세부 정보 및 결과를 볼 수 있습니다.
  - 통합 결과의 경우 미션 수행률, 미션별 평균 소요시간, 서비스 만족도 및 추천 지수의 통계가 그래프로 나타납니다.
  - 유저별 결과의 경우 유저별 세부 미션 수행사항 및 피드백 정보가 보여집니다.

<br>

## **테스터**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/6174be14-5031-4a69-bcfd-26deaa63bea4" />
</p>

- 테스터는 테스트 환경에서 UX 테스트를 진행 할 수 있습니다.
  - 화면 녹화 공유 기능을 제공함으로써 정량적 지표를 뒷받침 해줍니다.
  - 테스트 완료 후 테스터가 설문 작성을 할 수 있도록 설문 페이지를 제공합니다.

<br>

# Challenges
## 1. 사용성 테스트

<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/451faabf-3a81-47b6-a331-02ff5f53a98b" />
</div>

<br>

프로토타입 제작중에 과연 사람들이 이 서비스를 잘 사용할 수 있는지, 혹시 사용하기 어렵거나 복잡하지 않을지 고민이 됩니다. 이때 사용성 테스트를 통해 사용자들이 서비스를 목적에 맞게 잘 사용할 수 있는지 알 수 있습니다. 좀 더 사용자 친화적인 서비스로의 발전을 위해 필수적인 요소입니다.

UXPlorer는 오프라인에서 진행되는 사용성 테스트를 온라인으로 진행해 보면 편하지 않을까 하는 단순한 호기심에서 시작되었습니다.

### 1-1 온라인으로 사용성 테스트를 어떻게 진행할 수 있을까?
<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/014c6c12-7306-4d20-960c-a71d0af0665d" />
</div>

오프라인에서 진행되는 사용성 테스트는 다섯가지의 UX KPIs(Key Performance Indicators)를 기준으로 통계를 냅니다.

- ***UX KPIs(Key Performance Indicators)***
  - Task Success Rate (필요한 것을 찾아 해결한 사람이 몇명인지…)
  - Time on Task (필요한 것을 얼마나 빨리 찾아 끝냈는지…)
  - System Usability Scale : SUS (제품에 얼마나 만족을 하는지…) 질문지
  - Use of Search vs. Navigation (필요한 것을 찾기 위해 몇명이 내비게이션을 사용하고 몇명이 검색 기능을 썼는지…)
  - User Error Rate(오류가 몇번 발생했는지… 어떻게 해서 그런 오류가 떳는지…)

이 다섯가지의 UX KPIs 를 참고하여 어떻게 온라인에서 성과 지표를 통계화 할 수 있을지 고민해보았습니다.

<br>

### 1-2 무슨 지표를 어떤 근거로 어떻게 통계화 할 수 있을까?
정량적 지표와 정성적 지표를 기반으로 한 통계는 사용자로 하여금 보다 객관적인 데이터를 제공합니다.
더욱이 UXPlorer의 경우 온라인 플랫폼이다 보니 두가지 지표가 절대적이었습니다.

#### 정량적 지표
온라인에서 구현 가능한 지표를 추려보니
- 미션 수행률: 미션별 통과 여부 통계 시각화
- 미션 소요시간: 미션별 소요시간 통계 시각화
- 서비스 만족도 점수: System Usability Scale을 토대로 서비스 만족도 통계 시각화

위의 세가지 지표를 정량화 할 수 있었습니다.

각 테스트 별로 서비스 이용자(기업)가 테스터들에게 제공할 미션을 작성할 수 있습니다. 테스터는 모달을 이용하여 본인에게 주어진 미션을 수행하도록 했습니다.

<div align="center">
  <img width="300px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/d0141a9b-0652-48ca-960c-71b3db878359" />
</div>

1. **미션 수행률** - 서비스 이용자는 테스터의 미션 성공 여부를 어떻게 판단할 수 있을까요? 이를 위해 각 미션지에 **건너뛰기** 항목을 부여해 주어 테스터가 자발적으로 미션을 수행하지 못하였다는 근거로 수행 여부를 데이터화 하였습니다. **건너뛰기**의 경우 서비스 이용자가 미션을 작성할 때 미션별 예상 소요시간을 설정해 두고 예상 소요시간이 경과하면 테스터가 **건너뛰기** 항목을 선택할 수 있게 하였습니다. 테스터가 미션을 건너뛰었을 경우 해당 미션은 실패로 간주됩니다.

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

2. **미션 소요시간** - 각 미션별로 테스터가 미션을 **완료한 시간**을 알 수 있다면, 그리고 서비스 이용자가 서비스 기획 시 해당 기능을 완료할거라는 **예상 소요시간**에 대한 정보가 있다면 미션 소요시간을 통계화 하여 정량적 지표로 삼을 수 있습니다. 이 때 미션 소요시간의 데이터는 성공한 미션에 한정하여 통계에 사용합니다. 따라서 테스터가 **건너뛰기** 항목을 선택하였을 경우의 데이터는 무시됩니다.

3. **서비스 만족도 점수** - 설문지 작성을 통하여 테스터는 서비스 이용에 대한 만족도를 평가할 수 있고 이는 수치화 시킬 수 있으며 당연히 서비스 이용자에게 제공됩니다. 서비스 이용자는 수치화된 테스터별 만족도를 그래프화 하여 시각적으로 비교 할 수 있습니다.

위의 세가지 지표는 어디까지나 테스터의 재량에 맡기게 되어 온라인상에서 완벽한 데이터를 추출하는 데에는 한계가 있다고 생각했습니다. 따라서 **UXPlorer**는 ***화면녹화*** ***기능***을 제공하여 온라인 상에서 테스터를 Observation 하는 용도로 사용하고 서비스 이용자는 테스터의 화면 녹화본을 추가적인 정량적 지표를 보는데에 사용할 수 있게 하였습니다.

#### 정성적 지표
1. **테스터의 적극적인 참여** - 테스터는 미션 수행 시 미션에 관하여 피드백을 자유롭게 남길 수 있습니다. 이 피드백은 서비스 이용자에게 제공되며 테스터의 의견을 적극 반영할 수 있게 됩니다.

2. **NPS 점수** - NPS 점수는 기업이나 제품의 고객 충성도와 만족도를 간단하면서도 효과적으로 측정하는 지표입니다. 이 점수는 고객이 제품이나 서비스를 다른 사람에게 추천할 가능성을 0부터 10까지의 척도로 나타내며, 이를 통해 추천자, 중립자, 비평자의 세 그룹으로 분류합니다.

<br>
<br>

## 2. 사용자와 테스터의 구분

<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/b7c8df2a-9fd2-4e1c-a524-1746dee46c17" />
</div>

UXPlorer 에서 사용자와 테스터의 역할을 명확하게 구분하는 것은 크게 세가지 이유로 인해 필수적이었습니다.

- UXPlorer의 **데이터 보안**을 강화하기 위해 사용자는 데이터를 생성, 수정, 삭제할 수 있는 권한을 가지지만, 테스터는 주어진 테스트에 필요한 정보만을 열람할 수 있도록 설계해야 했습니다.
- 무분별한 **데이터 접근**을 방지하고, 테스터는 자신에게 할당된 테스트에만 접근할 수 있도록 제한하기 위해 사용자와 테스터의 역할을 구분하여 설계해야 했습니다.
- 사용자는 테스트를 관리하고 분석하는 데 필요한 다소 복잡한 인터페이스를 사용하고, 테스터는 간단하고 직관적인 인터페이스를 사용하도록 설계해야 했습니다. 이를 통해 각 역할에 **최적화된 환경**에서 효율성을 극대화할 수 있었습니다.

### 2-1 로그인 방식을 통해 사용자와 테스터의 역할을 구분할 수 있을까?
사용자와 테스터의 역할을 구분하기 위해 로그인 방식을 달리 적용하였습니다.

- **사용자 로그인:** 사용자는 **Google Firebase**를 사용하여 시스템에 로그인합니다. 이 방식은 사용자를 식별하고 인증하는 데 사용되며, 사용자가 시스템에서 테스트를 생성하고 관리할 수 있게 합니다.
- **테스터 로그인:** 테스터는 생성된 테스트의 **title**을 기반으로 한 고유한 테스터 ID와 비밀번호를 이메일로 부여받습니다. 테스터는 이 ID와 비밀번호를 사용하여 로그인하며, 이는 테스터가 특정 테스트에만 접근할 수 있도록 제한합니다. 비밀번호는 보안을 위해 bcrypt를 사용하여 해시되어 데이터베이스에 저장됩니다.

  ```jsx
  const testerPassword = `${Math.random().toString(36).substring(2, 8)}`;
  const hashedTesterPassword = await bcrypt.hash(testerPassword, saltRounds);
  ```

하지만 테스트의 **title**이 중복될 경우 동일한 테스터 ID가 생성되는 문제가 있었습니다.

이 문제를 해결하기 위해, 테스트 생성 시 서버의 데이터베이스에서 이미 존재하는 테스트 제목을 검사하여 중복을 방지합니다. 이 방법을 통해 데이터의 일관성을 유지하고 테스터 ID의 고유성을 확보할 수 있었습니다.

  ```jsx
    const existingTest = await Test.findOne({ title: testName });
  if (existingTest) {
    return res.status(400).json({ error: "Same Title already existed" });
  }
  ```

<br>

### 2-2 테스트 환경을 독립적으로 관리할 수 있을까?

제가 생각한 UXPlorer의 관건은 얼마나 재밌고 유용한 데이터가 모이느냐 입니다. 이는 서비스 이용자에게 더욱 도움이 되는 요소라 생각했습니다. 이를 위해
테스트, 테스터, 그리고 미션 데이터는 MongoDB의 **Reference** 방식으로 설계하였습니다.

- MongoDB 공식문서에 의하면 **Embedded 방식**과 **Reference 방식**은 다음과 같은 차이점이 있습니다.
  - **Embedded 방식**: Document 내에 관련 데이터가 직접 포함되는 방식으로, 조회 속도는 빠르지만, 데이터 업데이트가 복잡하고 중복이 발생할 것이라 판단했습니다.
  - **Reference 방식**: Document 간의 관계를 ID 참조를 통해 맺는 방식으로, 데이터 정규화가 용이하고, 업데이트가 간단합니다. 이 방식은 테스터와 미션 간의 관계를 유연하게 관리할 수 있게 해주며, 데이터의 일관성을 유지하는 데 유리하다고 판단했습니다.

- **테스트 및 미션 관리:** 각 테스트는 여러 미션을 포함하고, 이 미션들은 **Mission** 컬렉션에 독립적으로 저장됩니다. 각 테스터는 **Tester** 컬렉션에 저장되며, 각 테스터 문서는 수행해야 할 미션의 ID 배열을 참조합니다.

  ```jsx
  const missionPromises = missions.map(async (mission, index) => {
    const newMission = await Mission.create({
      description: mission.description,
      expectedDuration: mission.expectedDuration,
      order: index,
      completedBy: testerIds.map((testerId) => ({ tester: testerId })),
    });
    return newMission._id;
  });
  ```

- **미션 참조 업데이트:** 테스터 및 테스트 문서는 미션 ID를 참조하여 각 테스터와 테스트가 관련 미션을 추적할 수 있도록 합니다. 이는 테스터가 자신에게 할당된 미션만을 볼 수 있도록 하며, 각 테스트 환경을 독립적으로 유지합니다.

  ```jsx
  await Tester.findByIdAndUpdate(testerId, {
    $push: { missions: { $each: missionIds } },
  });
  ```

<br>
<br>

## 3. 테스트 미션 수행 로직 개선

<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/4d70aec2-f83d-441e-8bfc-caf569302c74" />
  <br>
  <strong>테스트 환경 흐름도</strong>
</div>

테스터는 이메일로 부여받은 테스트 ID 및 비밀번호를 사용하여 테스트 환경에 진입할 수 있게 설계해야 했습니다. 이를 위해 현재 진행될 테스트에 대한 설명을 위해 웰컴 모달을 활용했습니다.

### 3-1 현재 미션을 완료한 후 다음 미션으로 어떻게 이동할 수 있을까?
테스트 수행은 모달창에 의해 미션별로 진행됩니다. 현재 미션을 완료한 후 다음 미션으로 원할한 이동의 설계가 필요했습니다.

- **미션 인덱스 관리:** 미션들의 ID 배열을 **Jotai** 기반 전역 상태(**testerMissionsDataAtom**)에서 관리하여, 현재 미션의 인덱스를 쉽게 찾을 수 있도록 했습니다. 이 배열을 사용하여, 각 미션의 완료 후 다음 미션으로의 라우팅 경로를 동적으로 생성할 수 있었습니다.

  미션 인덱스 관리 예시 코드
  ```js
    const missionIds = useAtomValue(testerMissionsDataAtom);
    const currentMissionIndex = missionIds.findIndex((id) => id === missionId);
  ```

- **자동 라우팅 로직:** **navigateToNextMission** 함수는 현재 미션 인덱스를 기반으로 다음 미션의 인덱스를 계산합니다. 만약 다음 미션 인덱스가 배열 길이 내에 있다면, 해당 미션 ID로 라우팅을 업데이트합니다. 모든 미션을 완료했을 경우, 테스터를 설문 조사 페이지로 리디렉션합니다.

- **화면 녹화 중지:** 각 미션의 완료 시, 화면 녹화를 중지(**screenRecorder.stop()**)하고 서버에 데이터를 전송하는 로직을 수행합니다.

  자동 라우팅 및 화면 녹화 중지 예시 코드
  ```js
  function navigateToNextMission() {
    const nextMissionIndex = currentMissionIndex + 1;
    if (nextMissionIndex < missionIds.length) {
      const nextMissionId = missionIds[nextMissionIndex];
      navigate(`/tester/${testerId}/mission/${nextMissionId}`);
    } else {
      screenRecorder.stop(); // 화면 녹화 중지
      navigate(`/tester/${testerId}/survey`);
    }
  }
  ```

<br>

### 3-2 테스터의 피드백을 어떻게 적극적으로 반영하여 시스템을 개선할 수 있을까?
테스터는 미션 수행 시 미션에 관하여 피드백을 자유롭게 남길 수 있도록 설계하였습니다. 이 피드백은 서비스 이용자에게 제공되며 테스터의 의견을 적극 반영할 수 있게 됩니다.

테스터의 피드백을 수집하고 이를 시스템 개선에 활용하는 절차는 다음과 같습니다:

- **피드백 입력 인터페이스:** 테스터는 **FeedbackTextarea** 컴포넌트를 통해 피드백을 입력할 수 있습니다. 피드백은 로컬 상태(**feedback**)에 저장되며, `저장` 버튼 클릭 시 서버로 전송 준비가 완료됩니다.

  피드백 입력 인터페이스 예시 코드
  ```js
  // 피드백 입력 인터페이스
  const [feedback, setFeedback] = useState(""); // 로컬 상태

  function handleFeedbackChange(event) {
    setFeedback(event.target.value); // 입력한 피드백을 상태에 저장
  }

  function handleFeedbackSubmit() {
    setIsFeedbackOpen(false); // 피드백 입력 인터페이스 닫기
  }
  ```
- **서버에 피드백 전송:** 피드백과 관련된 데이터는 **handleNextMission** 및 **handleSkipMission** 함수를 통해 처리됩니다. 이들 함수는 미션 완료 또는 건너뛰기 데이터와 함께 피드백을 서버로 전송합니다. 전송 성공 후, 사용자는 자동으로 다음 미션으로 이동하거나 설문 조사를 수행할 수 있습니다.

  서버에 피드백 전송 예시 코드
  ```js
  // 서버에 피드백 전송
  function handleNextMission() {
    const missionCompletionData = {
      completed: true,
      createdAt: new Date(new Date() - missionTime * 1000),
      completedAt: new Date(),
      duration: missionTime,
      feedback,
    };

    setFeedback(""); // 피드백 상태 초기화

    updateMissionData(missionCompletionData, {
      onSuccess: () => {
        navigateToNextMission(); // 전송 성공 시 다음 미션으로 이동
      },
    });
  }
  ```

<br>
<br>

# Tech Stacks

### Client

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![Jotai](https://img.shields.io/badge/Jotai-000?style=for-the-badge&logoColor=white) ![Styled-Components](https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white)


### Server

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Test

![React Dom Testing](https://img.shields.io/badge/react%20dom%20testing-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vitest](https://img.shields.io/badge/Vitest-%2344A833.svg?style=for-the-badge&logoColor=white)

### Deployment

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br>
<br>

# Schedule
### **프로젝트 기간: 2024.03.04(월) ~ 2024.03.27(수)**

<br>

**1 주차: 아이디어 선정, POC, 목업 및 DB스키마 설계**

<br>

**2 - 3주차: 클라이언트 구현 및 서버 구현**
