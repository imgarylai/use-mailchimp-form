import { renderHook } from "@testing-library/react-hooks";
import { useFormFields, useMailChimpForm } from "../src";

test("should return initial mailchimp form state", () => {
  const { result } = renderHook(() => useFormFields({ email: "" }));
  expect(result.current.fields).toEqual({ email: "" });
});

test("should return initial mailchimp form state", () => {
  const { result } = renderHook(() =>
    useMailChimpForm(
      `https://example.us20.list-manage.com/subscribe/post?u=example&amp;id=example`
    )
  );

  expect(result.current.success).toBe(false);
  expect(result.current.error).toBe(false);
  expect(result.current.loading).toBe(false);
  expect(result.current.message).toBe("");
});
