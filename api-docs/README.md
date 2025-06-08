**use-mailchimp-form v3.1.3**

---

# use-mailchimp-form [![npm](https://img.shields.io/npm/v/use-mailchimp-form)](https://www.npmjs.com/package/use-mailchimp-form) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![codecov](https://codecov.io/gh/imgarylai/use-mailchimp-form/branch/main/graph/badge.svg?token=HK9ISNOG26)](https://codecov.io/gh/imgarylai/use-mailchimp-form)

A React hooks-based solution for integrating [MailChimp](https://mailchimp.com/) subscribe forms into your React applications. This package handles all the business logic, allowing you to focus on the UI implementation. The view component can be fully customized or implemented with any React form library.

## Features

- 🎣 React Hooks-based implementation
- 🎨 Fully customizable UI
- 📦 Zero dependencies (except React)
- 🔒 Type-safe with TypeScript support
- 🚀 Modern ESM and CommonJS support

## Requirements

- Node.js >= 20.0.0
- npm >= 10.0.0
- React >= 18.2.0

## Installation

Using npm:

```bash
npm install use-mailchimp-form
```

Using yarn:

```bash
yarn add use-mailchimp-form
```

## Setup

### Getting Your Mailchimp Form Endpoint

1. Navigate to the `Audience` page in your Mailchimp dashboard
2. Click the dropdown menu `Manage Audience > Signup Forms`
3. Select `Embedded Form`
4. In the generated code, locate the form's action URL. It will look like:
   ```
   https://aaaaaaaaa.us20.list-manage.com/subscribe/post?u=xxxxxxxxxxxxxxxxxx&amp;id=yyyyyyyyyy
   ```

## Usage

### Basic Example

```jsx
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";

export default function SubscribeForm() {
  const url = "YOUR_SUBSCRIBE_URL";
  const { loading, error, success, message, handleSubmit } =
    useMailChimpForm(url);
  const { fields, handleFieldChange } = useFormFields({
    EMAIL: "",
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
          placeholder="Enter your email"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {loading && <p>Submitting...</p>}
      {error && <p className="error">{message}</p>}
      {success && <p className="success">{message}</p>}
    </div>
  );
}
```

### Hook Return Values

#### useMailChimpForm

- `loading`: Boolean indicating submission status
- `error`: Boolean indicating if an error occurred
- `success`: Boolean indicating successful submission
- `message`: String containing response message
- `handleSubmit`: Function to handle form submission

#### useFormFields

- `fields`: Object containing form field values
- `handleFieldChange`: Function to handle field changes

## Custom Form Integration

The `useFormFields` hook is optional. You can use your preferred form management solution (Formik, React Hook Form, etc.) with `useMailChimpForm`:

```jsx
import { useMailChimpForm } from "use-mailchimp-form";
import { useForm } from "react-hook-form";

export default function CustomForm() {
  const { handleSubmit: submitToMailchimp } = useMailChimpForm("YOUR_URL");
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    submitToMailchimp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("EMAIL")} type="email" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Gary Lai](https://github.com/imgarylai)
