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

function SignUp() {
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
        <Breadcrumb>create account</Breadcrumb>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            username: "",
          }}
          onSubmit={handleSubmit}
          validate={validateInputs}
        >
          {({ errors, touched }) => (
            <Form className="sign-up-form">
              {/* {JSON.stringify(errors)} */}
              <h3>sign up</h3>
              <div className="have-account">
                <p>Already have an account?</p>
                <Link to="/sign-in">sign in</Link>
              </div>
              <div className="input-splitter">
                <Field
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  className={cls(
                    errors.firstName ? "error" : "",
                    "main-input mb-4"
                  )}
                />
                {errors.firstName && touched.firstName ? (
                  <FormErrorMessage message={errors.firstName} />
                ) : null}
                <Field
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  className={cls(
                    errors.lastName ? "error" : "",
                    "main-input mb-4"
                  )}
                />
                {errors.lastName && touched.lastName ? (
                  <FormErrorMessage message={errors.lastName} />
                ) : null}
              </div>
              <Field
                name="username"
                placeholder="Username"
                type="text"
                className={cls(
                  errors.username ? "error" : "",
                  "main-input mb-4"
                )}
              />
              {errors.username && touched.username ? (
                <FormErrorMessage message={errors.username} />
              ) : null}
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
              <Button>create</Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignUp;
