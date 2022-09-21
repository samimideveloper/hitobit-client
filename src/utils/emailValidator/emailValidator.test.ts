import { isEmailValid } from ".";

test("check email validate", () => {
  expect(isEmailValid("alirezagmail.com")).toBe(false);
  expect(isEmailValid("alireza@gmail.com")).toBe(true);
  expect(isEmailValid("alireza@gmail")).toBe(false);
  expect(isEmailValid("alireza@yahoo.com")).toBe(true);
  expect(isEmailValid("alirezagmail")).toBe(false);
  expect(isEmailValid("gho@gmail.com")).toBe(true);
});
