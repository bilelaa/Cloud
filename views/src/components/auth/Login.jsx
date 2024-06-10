import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()

  const [setUser] = useUserStore((state)=>[state.setUser])
  const [constants] = useState({
    EMAIL_REGEX:
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
  });
  const [schema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .required("Required")
        .matches(constants.EMAIL_REGEX, "Invalid email"),
      password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .matches(
          constants.PASSWORD_REGEX,
          "Use upper and lower case characters, digits and special character"
        ),
    })
  );

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          import("../../services/auth.service")
            .then(async (module) => await module.login(values))
            .then((res) => {
              toast.success("Login Success");
              setUser(res.user)
              navigate("/")
              return res;
            })
            .catch((e) => {
              toast.error(e.response.data.message);
              console.log(e);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="mb-5 text-2xl font-semibold">Login </h2>

            <div className="mb-4">
              <label className="block mb-1"> Email </label>

              <Field
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Type your email"
                name="email"
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className="mb-4">
              <label className="block mb-1"> Email </label>

              <Field
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="password"
                placeholder="Type your password"
                name="password"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>

            <button
              name="submit"
              type="submit"
              className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Connect
            </button>
          </Form>
        )}
      </Formik>
      <hr className="mt-4" />

      <p className="text-center mt-5">
        Don't have an account?
        <Link to="/auth/register" className="text-blue-500">
          Register{" "}
        </Link>
      </p>
    </div>
  );
}

export default Login;
