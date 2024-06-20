import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface UserInfo {
  username?: string;
  userId?: string;
}

interface TestDetail {
  testName: string;
  testDescription: string;
  testUrl: string;
  testerEmails: string[];
  testDeadline: string;
}

interface Mission {
  id: string;
  description: string;
  expectedDuration: string;
}

interface CurrentTestData {
  _id: string;
  title: string;
  description: string;
  testUrl: string;
  deadline: string;
  missions: string[];
  testers: string[];
  owner: string;
}

interface CurrentMission {
  description: string;
  expectedDuration?: number;
}

export const userAtom = atomWithStorage<UserInfo>("userInfo", {});

export const currentTestIdAtom = atom("");
export const currentTestTitleAtom = atom("");
export const currentTestDataAtom = atom<CurrentTestData>({
  _id: "",
  title: "",
  description: "",
  testUrl: "",
  deadline: "",
  missions: [],
  testers: [],
  owner: "",
});
export const missionsDataAtom = atom([]);
export const completedMissionCountAtom = atom({
  completedMissionsCount: 0,
  totalMissionsCount: 0,
});
export const completedMissionDataAtom = atom({});

export const testerMissionsDataAtom = atom([]);
export const currentMission = atom<Mission | undefined>(undefined);

export const testerAtom = atomWithStorage("testerInfo", "");
export const testerDataAtom = atom([]);
export const completedTesterAtom = atom([]);

export const testDetailAtom = atom<TestDetail>({
  testName: "",
  testDescription: "",
  testUrl: "",
  testerEmails: [],
  testDeadline: "",
});

export const missionAtom = atom<Mission[]>([
  {
    id: crypto.randomUUID(),
    description: "",
    expectedDuration: "",
  },
]);

export const screenRecorderAtom = atomWithStorage<MediaRecorder | null>("isScreenRecording", null);

export const errorMessageAtom = atom("");

export const surveyResultsAtom = atom([]);

export const searchQueryAtom = atom("");
