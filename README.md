# use-mailchimp-form [![npm](https://img.shields.io/npm/v/use-mailchimp-form)](https://www.npmjs.com/package/use-mailchimp-form) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![codecov](https://codecov.io/gh/imgarylai/use-mailchimp-form/branch/main/graph/badge.svg?token=HK9ISNOG26)](https://codecov.io/gh/imgarylai/use-mailchimp-form)

This package helps you integrate the [MailChimp](https://mailchimp.com/) subscribe form into your React App.
It is implemented in the React hooks way to handle the business logic. You can just make your efforts for the view. 😀 The view component can be fully customized or implemented with other React form library.      

## Install

```bash
$ npm install use-mailchimp-form
```
or
```base
$ yarn add use-mailchimp-form
```

## Mailchimp

To get your mailchimp form post endpoint.

1. Go to the `audience` Page. In the right-hand side, click the dropdown menu, `Manage Audience > Signup Form`.
2. Select `Embedded Form`. 
3. Inside integration the code, find the form post action url, which is like: `https://aaaaaaaaa.us20.list-manage.com/subscribe/post?u=xxxxxxxxxxxxxxxxxx&amp;id=yyyyyyyyyy`  

We need this url later. 
  
## Usage

```jsx
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";

// The useFormFields is not necessary. You can use your own form component.  

export default function App() {
  const url = "YOUR_SUBSCRIBE_URL";
  // The url looks like the url below:
  // https://aaaaaaaaa.us20.list-manage.com/subscribe/post?u=xxxxxxxxxxxxxxxxxx&amp;id=yyyyyyyyyy
  const {
      loading,
      error,
      success,
      message,
      handleSubmit
    } = useMailChimpForm(url);
  const [fields, handleFieldChange] = useFormFields({
    EMAIL: ""
  });
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit(fields);
        }}
      >
        <input
          id="EMAIL"
          autoFocus
          type="email"
          value={fields.EMAIL}
          onChange={handleFieldChange}
        />
        <button>submit</button>
      </form>
      {loading && "submitting"}
      {error && message}
      {success && message}
    </div>
  );
}

```

## Live Demo

[![Edit use-mailchimp-form](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-mailchimp-form-7r3br?fontsize=14&hidenavigation=1&theme=dark)
