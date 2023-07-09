import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "../../components/forms/Button/Button";
import { cls, api } from "../../utils/utils";
import { useState } from "react";
import handleError from "../../utils/handleError";
import Breadcrumb from "../../components/forms/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import FormErrorMessage from "../../components/forms/ErrorMessage/FormErrorMessage";
import "./auth.scss";

function SignUp() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    console.log(`submit values =>`, values);

    if (loading) return;
    setLoading(true);

    try {
      const response = await api.post("/register", values);
      if (response.status === 200) {
        console.log(`success`);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
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
              <h3>sign up</h3>
              <div className="have-account">
                <p>Already have an account?</p>
                <Link to="/sign-in">sign in</Link>
              </div>
              <div className="input-splitter">
                <div>
                  <Field
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    className={cls(
                      errors.firstName && touched.firstName ? "error" : "",
                      "main-input mb-4"
                    )}
                  />
                  {errors.firstName && touched.firstName ? (
                    <FormErrorMessage message={errors.firstName} />
                  ) : null}
                </div>
                <div>
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    className={cls(
                      errors.lastName && touched.lastName ? "error" : "",
                      "main-input mb-4"
                    )}
                  />
                  {errors.lastName && touched.lastName ? (
                    <FormErrorMessage message={errors.lastName} />
                  ) : null}
                </div>
              </div>
              <Field
                name="email"
                placeholder="Email"
                type="email"
                className={cls(
                  errors.email && touched.email ? "error" : "",
                  "main-input mb-4"
                )}
              />
              {errors.email && touched.email ? (
                <FormErrorMessage message={errors.email} />
              ) : null}
              <Field
                name="password"
                placeholder="Password"
                type="password"
                className={cls(
                  errors.password && touched.password ? "error" : "",
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

function validateInputs(values) {
  const errors = {};
  const { email, password, firstName, lastName } = values;
  if (!firstName) {
    errors.firstName = "first name is required!";
  } else if (firstName.length < 3) {
    errors.firstName = "first minimum length is 3 characters";
  } else if (firstName.length > 16) {
    errors.firstName = "first maximum length is 16 characters";
  }
  if (!lastName) {
    errors.lastName = "last name is required!";
  } else if (lastName.length < 3) {
    errors.lastName = "last minimum length is 3 characters";
  } else if (lastName.length > 16) {
    errors.lastName = "last maximum length is 16 characters";
  }
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
