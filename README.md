# use-mailchimp-form [![npm](https://img.shields.io/npm/v/use-mailchimp-form)](https://www.npmjs.com/package/use-mailchimp-form) [![Build Status](https://travis-ci.com/imgarylai/use-mailchimp-form.svg?branch=master)](https://travis-ci.com/imgarylai/use-mailchimp-form) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Install

```bash
$ npm install use-mailchimp-form
```

This package helps you integrate the [MailChimp](https://mailchimp.com/) subscribe form into your React web page.
It is implemented in the React hooks way to handle the business logic. Your only responsibility is to create the view. 😀 And the view can be fully customized.      
  
## Usage

```jsx
import { useState } from "react";
import { useMailChimpForm } from "use-mailchimp-form";

const useFormFields = initialState => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
};

export default function App() {
  const url = "YOUR_SUBSCRIBE_URL";
  // The url looks like the url below:
  // https://aaaaaaaaa.us20.list-manage.com/subscribe/post?u=xxxxxxxxxxxxxxxxxx&amp;id=yyyyyyyyyy
  const { status, message, handleSubmit } = useMailChimpForm(url);
  const [params, handleFieldChange] = useFormFields({
    EMAIL: ""
  });
  return (
    <div>
      <form onSubmit={event => handleSubmit(event, params)}>
        <input
          id="EMAIL"
          autoFocus
          type="email"
          value={params.EMAIL}
          onChange={handleFieldChange}
        />
        <button>submit</button>
      </form>
      {status.loading && message}
      {status.error && message}
      {status.success && message}
    </div>
  );
}

```

## Live Demo

[![Edit use-mailchimp-form](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-mailchimp-form-7r3br?fontsize=14&hidenavigation=1&theme=dark)