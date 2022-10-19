import fetchJsonp from "fetch-jsonp";
import queryString from "query-string";
import { ChangeEvent, useState } from "react";
import { getErrorMessage } from "./errors";

export interface Params {
  [key: string]: unknown;
}

interface Response {
  result: string;
  msg: string;
}

export const useFormFields: (initialState: Params) => {
  handleFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fields: Params;
} = (initialState: Params) => {
  const [fields, setValues] = useState(initialState);
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [event.target.id]: event.target.value,
    });
  };
  return { fields, handleFieldChange };
};

export const useMailChimpForm: (url: string) => {
  handleSubmit: (params: Params) => void;
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

  const handleSubmit = async (params: Params): Promise<void> => {
    const query = queryString.stringify(params);
    const endpoint = url.replace("/post?", "/post-json?") + "&" + query;
    setStatus({ ...status, loading: true });
    setMessage("");
    try {
      const response: fetchJsonp.Response = await fetchJsonp(endpoint, {
        jsonpCallback: "c",
      });

      const data: Response = await response.json<Response>();

      const error = !response.ok || data.result === "error";

      setStatus({
        ...initStatusState,
        success: !error,
        error
      });

      setMessage(data.msg);
    } catch (error) {
      setStatus({ ...initStatusState, error: true });
      setMessage(getErrorMessage(error));
    }
  };

  const reset: () => void = () => {
    setMessage("");
    setStatus(initStatusState);
  };

  return {
    status: status,
    loading: status.loading,
    success: status.success,
    error: status.error,
    message,
    handleSubmit,
    reset,
  };
};
