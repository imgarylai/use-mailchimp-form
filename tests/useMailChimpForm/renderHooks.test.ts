import { renderHook, act } from "@testing-library/react";
import { useFormFields, useMailChimpForm } from "../../src";
import { TEST_EMAIL, TEST_MAILCHIMP_URL } from "../const";
import React from "react";

describe("useFormFields", () => {
  test("should return initial form state", () => {
    const { result } = renderHook(() => useFormFields({ email: "" }));
    expect(result.current.fields).toEqual({ email: "" });
  });

  test("should update field value", () => {
    const { result } = renderHook(() => useFormFields({ email: "" }));

    const event = {
      target: { id: "email", value: TEST_EMAIL },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleFieldChange(event);
    });

    expect(result.current.fields).toEqual({ email: TEST_EMAIL });
  });
});

describe("useMailChimpForm", () => {
  test("should return initial form status", () => {
    const { result } = renderHook(() => useMailChimpForm(TEST_MAILCHIMP_URL));

    // Only check the properties we care about
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.message).toBe("");
    expect(typeof result.current.handleSubmit).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });
});
