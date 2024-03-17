import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("userInfo", "");

export const currentTestIdAtom = atom("");
export const currentTestTitleAtom = atom("");
export const currentTestDataAtom = atom("");
export const missionsDataAtom = atom([]);
export const testerDataAtom = atom([]);

export const testDetailAtom = atom({
  testName: "",
  testDescription: "",
  testUrl: "",
  testerEmails: [],
  testDeadline: "",
});

export const missionAtom = atom([
  {
    id: crypto.randomUUID(),
    description: "",
    expectedDuration: "",
  },
]);
