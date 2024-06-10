import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Password({ email }) {
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);

  const [PASSWORD_REGEX] = useState(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
  );
  const [passwordSchema] = useState(
    Yup.object().shape({
      password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .matches(
          PASSWORD_REGEX,
          "Use upper and lower case characters, digits and special character"
        ),
      confirm: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    })
  );

  useEffect(() => {
    isCreated === true ? navigate("/auth/login") : null;
  }, [isCreated]);

  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          password: "",
          confirm: "",
        }}
        validationSchema={passwordSchema}
        onSubmit={async (values) => {
          import("../../../services/auth.service")
            .then((module) =>
              module.register({ email, password: values.password })
            )
            .then((res) => {
              toast.success("Account created succefully");
              setIsCreated(true);
              return res.data;
            })
            .catch((e) => console.log(e));
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                password
              </label>
              <Field
                type="password"
                className=" opacity-70 block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirm"
                className="block text-sm font-semibold text-gray-800"
              >
                confirm
              </label>
              <Field
                type="password"
                className=" opacity-70 block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="confirm"
              />
              {errors.confirm && touched.confirm ? (
                <div>{errors.confirm}</div>
              ) : null}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                name="submit"
                className={
                  "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                }
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Password;
