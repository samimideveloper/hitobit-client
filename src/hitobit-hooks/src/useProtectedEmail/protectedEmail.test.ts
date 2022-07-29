import { renderHook } from "@testing-library/react";
import { useProtectedEmail } from ".";

test("check protected email", () => {
  const { result: case1 } = renderHook(() =>
    useProtectedEmail("alirezahemati71@gmail.com"),
  );
  const { result: case2 } = renderHook(() =>
    useProtectedEmail("alire@gmail.com"),
  );

  expect(case1.current).toBe("ali************@gmail.com");
  expect(case2.current).toBe("ali**@gmail.com");
});
