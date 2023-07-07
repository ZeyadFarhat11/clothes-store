import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "../components/forms/Button/Button";
import { cls, api } from "../utils/utils";
import { useState } from "react";
import handleError from "../utils/handleError";
import Breadcrumb from "../components/forms/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import FormErrorMessage from "../components/forms/ErrorMessage/FormErrorMessage";
import "../assets/style/auth.scss";

function SignIn() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    // const { email, password } = values;
    console.log(`submit values =>`, values);

    if (loading) return;
    setLoading(true);

    try {
      const response = await api.post("/auth/login", values);
      if (response.status === 200) {
        console.log(`success`);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }
  function validateInputs(values) {
    const errors = {};
    const { email, password } = values;
    if (!email) {
      errors.email = "email is required!";
    } else if (!validator.isEmail(email)) {
      errors.email = "email is invalid!";
    }
    if (!password) {
      errors.password = "password is required!";
    } else if (password.length < 6) {
      errors.password = "password minimum length is 6 characters";
    } else if (password.length > 32) {
      errors.password = "password maximum length is 32 characters";
    }
    return errors;
  }
  return (
    <>
      <div className="container">
        <Breadcrumb>account</Breadcrumb>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validate={validateInputs}
        >
          {({ errors, touched }) => (
            <Form className="sign-in-form">
              {/* {JSON.stringify(errors)} */}
              <h3>sign in</h3>
              <Field
                name="email"
                placeholder="Email"
                type="email"
                className={cls(errors.email ? "error" : "", "main-input mb-4")}
              />
              {errors.email && touched.email ? (
                <FormErrorMessage message={errors.email} />
              ) : null}
              <Field
                name="password"
                placeholder="Password"
                type="password"
                className={cls(
                  errors.password ? "error" : "",
                  "main-input mb-4"
                )}
              />
              {errors.password && touched.password ? (
                <FormErrorMessage message={errors.password} />
              ) : null}
              <Button>sign in</Button>
              <hr />
              <footer>
                <Link to="#">forgot your password?</Link>
                <Link to="/sign-up">sign up</Link>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignIn;
