import { getErrorMessage } from "../src/errors";

describe("Error messages", () => {
  test("should get error message from error object", () => {
    const error = new Error("Test error");
    expect(getErrorMessage(error)).toEqual(error.message);
  });

  test("should get error message from error json object", () => {
    const errorJson = { message: "Test Error" };
    expect(getErrorMessage(errorJson)).toEqual(errorJson.message);
  });

  test("should return error message from error string", () => {
    const errorString = "Test Error";
    expect(getErrorMessage(errorString)).toEqual(errorString);
  });

  test("should return error message if error message has cyclic object value", () => {
    const jsonMock = jest.spyOn(JSON, "stringify");
    jsonMock.mockImplementation(() => {
      throw new TypeError("cyclic object value");
    });
    const errorString = "Test Error";
    expect(getErrorMessage(errorString)).toEqual("Test Error");
  });
});
