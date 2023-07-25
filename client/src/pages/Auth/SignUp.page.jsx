import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "../../components/forms/Button/Button";
import { cls, api } from "../../utils/utils";
import { useState } from "react";
import handleError from "../../utils/handleError";
import Breadcrumb from "../../components/forms/Breadcrumb/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import FormErrorMessage from "../../components/forms/ErrorMessage/FormErrorMessage";
import "./auth.scss";
import { toast } from "react-toastify";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values) {
    console.log(`submit values =>`, values);

    if (loading) return;
    setLoading(true);

    try {
      const response = await api.post("/register/", values, {
        headers: { Authorization: undefined },
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Register success, Please login in");
        navigate("/sign-in");
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
            first_name: "",
            last_name: "",
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
                    name="first_name"
                    placeholder="First Name"
                    type="text"
                    className={cls(
                      errors.first_name && touched.first_name ? "error" : "",
                      "main-input mb-4"
                    )}
                  />
                  {errors.first_name && touched.first_name ? (
                    <FormErrorMessage message={errors.first_name} />
                  ) : null}
                </div>
                <div>
                  <Field
                    name="last_name"
                    placeholder="Last Name"
                    type="text"
                    className={cls(
                      errors.last_name && touched.last_name ? "error" : "",
                      "main-input mb-4"
                    )}
                  />
                  {errors.last_name && touched.last_name ? (
                    <FormErrorMessage message={errors.last_name} />
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
  const { email, password, first_name, last_name } = values;
  if (!first_name) {
    errors.first_name = "first name is required!";
  } else if (first_name.length < 3) {
    errors.first_name = "first minimum length is 3 characters";
  } else if (first_name.length > 16) {
    errors.first_name = "first maximum length is 16 characters";
  }
  if (!last_name) {
    errors.last_name = "last name is required!";
  } else if (last_name.length < 3) {
    errors.last_name = "last minimum length is 3 characters";
  } else if (last_name.length > 16) {
    errors.last_name = "last maximum length is 16 characters";
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
