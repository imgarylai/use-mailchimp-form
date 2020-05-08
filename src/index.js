import { useState } from "react";
import jsonp from "jsonp";
import queryString from "query-string";

export const useMailChimpForm = (url) => {
  const initStatusState = {
    loading: false,
    error: false,
    success: false,
  };
  const [status, setStatus] = useState(initStatusState);
  const [message, setMessage] = useState("");

  const handleSubmit = (event, params) => {
    event.preventDefault();
    const query = queryString.stringify(params);
    const endpoint = url.replace("/post?", "/post-json?") + "&" + query;
    setStatus({ ...status, loading: true });
    setMessage("sending");
    jsonp(endpoint, { param: "c" }, (error, data) => {
      if (error) {
        setStatus({ ...initStatusState, error: true });
        setMessage(error);
      } else if (data.result !== "success") {
        setStatus({ ...initStatusState, error: true });
        setMessage(data.msg);
      } else {
        setStatus({ ...initStatusState, success: true });
        setMessage(data.msg);
      }
    });
  };

  const resetStatus = () => {
    setStatus(initStatusState);
  };

  return { status, message, handleSubmit, resetStatus };
};
