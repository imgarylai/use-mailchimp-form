import { act, renderHook } from "@testing-library/react-hooks";
import { useFormFields, useMailChimpForm } from "../../src";
import { TEST_EMAIL, TEST_MAILCHIMP_URL } from "../const";

test("should return initial mailchimp form state", () => {
  const { result } = renderHook(() => useFormFields({ email: "" }));
  expect(result.current.fields).toEqual({ email: "" });
});

test("should return initial mailchimp form status", () => {
  const { result } = renderHook(() => useMailChimpForm(TEST_MAILCHIMP_URL));
  expect(result.current.success).toBe(false);
  expect(result.current.error).toBe(false);
  expect(result.current.loading).toBe(false);
  expect(result.current.message).toBe("");
});

test("should return initial mailchimp form state", () => {
  const { result } = renderHook(() => useFormFields({ email: "" }));
  act(() => {
    result.current.handleFieldChange({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target: { id: "email", value: TEST_EMAIL },
    });
  });
  expect(result.current.fields).toEqual({ email: TEST_EMAIL });
});
