import { useState } from "react";
import jsonp from "jsonp";
import queryString from "query-string";

export const useMailChimpForm = (url: string) => {
  const initStatusState = {
    loading: false,
    error: false,
    success: false,
  };
  const [status, setStatus] = useState(initStatusState);
  const [message, setMessage] = useState("");

  const handleSubmit = (params: { [key: string]: any }): void => {
    const query = queryString.stringify(params);
    const endpoint = url.replace("/post?", "/post-json?") + "&" + query;
    setStatus({ ...status, loading: true });
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

  const reset: () => void = () => {
    setStatus(initStatusState);
    setMessage("");
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
