import { renderHook, act } from "@testing-library/react";
import fetchJsonp from "fetch-jsonp";
import { useMailChimpForm } from "../../src";
import { TEST_EMAIL, TEST_MAILCHIMP_URL, TEST_MESSAGE } from "../const";

jest.mock("fetch-jsonp", () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ msg: "TESTING Message" }),
    })
  )
);

describe("handleSubmit mailchimp response shows not ok", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("should receive failure status and message", async () => {
    const { result } = renderHook(() => useMailChimpForm(TEST_MAILCHIMP_URL));

    // Submit the form
    await act(async () => {
      await result.current.handleSubmit({ email: TEST_EMAIL });
    });

    // Verify the failure state
    expect(fetchJsonp).toHaveBeenCalledWith(
      expect.stringContaining("post-json"),
      expect.any(Object)
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe(true);
    expect(result.current.message).toBe(TEST_MESSAGE);
  });
});
