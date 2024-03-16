import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("userInfo", "");

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
