import { ChangeEvent, useState } from "react";
import jsonp from "jsonp";
import queryString from "query-string";

export const useFormFields = (initialState: { [key: string]: any }) => {
  const [fields, setValues] = useState(initialState);
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [event.target.id]: event.target.value,
    });
  };
  return { fields, handleFieldChange };
};

export const useMailChimpForm: (
  url: string
) => {
  // eslint-disable-next-line
  handleSubmit: (params: { [p: string]: any }) => void;
  success: boolean;
  reset: () => void;
  loading: boolean;
  error: boolean;
  message: string;
} = (url: string) => {
  const initStatusState = {
    loading: false,
    error: false,
    success: false,
  };
  const [status, setStatus] = useState(initStatusState);
  const [message, setMessage] = useState("");

  // eslint-disable-next-line
  const handleSubmit = (params: { [key: string]: any }): void => {
    const query = queryString.stringify(params);
    const endpoint = url.replace("/post?", "/post-json?") + "&" + query;
    setStatus({ ...status, loading: true });
    setMessage("");
    jsonp(endpoint, { param: "c" }, (error, data) => {
      if (error) {
        setStatus({ ...initStatusState, error: true });
        setMessage(error.message);
      } else {
        if (data.result !== "success") {
          setStatus({ ...initStatusState, error: true });
        } else {
          setStatus({ ...initStatusState, success: true });
        }
        setMessage(data.msg);
      }
    });
  };

  const reset: () => void = async () => {
    await setMessage("");
    await setStatus(initStatusState);
  };

  return {
    loading: status.loading,
    success: status.success,
    error: status.error,
    message,
    handleSubmit,
    reset,
  };
};
