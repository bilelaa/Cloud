import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Password from "./Password";
import toast from "react-hot-toast";

function Email({ isVerified, email ,isCreated }) {
  console.log(isVerified);
  const [constants] = useState({
    EMAIL_REGEX:
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  });
  const [schema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .required("Required")
        .matches(constants.EMAIL_REGEX, "Invalid email"),
    })
  );

  return (
    <>
      {!isVerified ? (
        <div
          style={{ maxWidth: "480px" }}
          className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
        >
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              import("../../../services/auth.service")
                .then((module) => module.sendEmail(values))
                .then((res) =>
                  toast.success("Email sent please verify your inbox")
                )
                .catch((e) => {
                  toast.error(e.response.data.message);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <h2 className="mb-5 text-2xl font-semibold">
                  Register Account
                </h2>

                <div className="mb-4">
                  <label className="block mb-1"> Email </label>

                  <Field
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    placeholder="Type your email"
                    name="email"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>

                <button
                  name="submit"
                  type="submit"
                  className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <hr className="mt-4" />

          <p className="text-center mt-5">
            Already have an account?
            <Link to="/auth/login" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      ) : (
        <Password  isCreated={isCreated} email={email} />
      )} 
    </>
  );
}

export default Email;
