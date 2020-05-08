import { useState } from "react";
import jsonp from "jsonp";
import queryString from "query-string";

export const useMailChimpForm = (url) => {
  const initStatusState = {
    isSending: false,
    isError: false,
    isSuccess: false,
  };
  const [status, setStatus] = useState(initStatusState);
  const [message, setMessage] = useState("");

  const handleSubmit = (event, params) => {
    event.preventDefault();
    const query = queryString.stringify(params);
    const endpoint = url.replace("/post?", "/post-json?") + "&" + query;
    setStatus({ ...status, isSending: true });
    setMessage("sending");
    jsonp(endpoint, { param: "c" }, (error, data) => {
      if (error) {
        setStatus({ ...initStatusState, isError: true });
        setMessage(error);
      } else if (data.result !== "success") {
        setStatus({ ...initStatusState, isError: true });
        setMessage(data.msg);
      } else {
        setStatus({ ...initStatusState, isSuccess: true });
        setMessage(data.msg);
      }
    });
  };

  const resetStatus = () => {
    setStatus(initStatusState);
  };

  return { status, message, handleSubmit, resetStatus };
};
