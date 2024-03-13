import { atom } from "jotai";

export const userAtom = atom("");

export const testDetailAtom = atom({
  testName: "",
  testDescription: "",
  testUrl: "",
  testerEmails: [],
  testDeadline: "",
});
