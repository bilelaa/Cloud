import { useEffect, useState } from "react";
import Email from "./chunks/Email";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";


function Register() {
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);
  const [isCreated, setIsCreated] = useState(false);



  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.search.split("=").includes("?token")) {
      import("../../services/auth.service")
        .then((module) =>
           module.verifyEmail({ token: location.search.split("=")[1] })
        )
        .then((res) => {
          toast.success("Email vaildated succefully");
          setIsVerified(true);
          setEmail(res.email);

          return res.data;
        })
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      {/* <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          import("../../services/auth.service")
            .then((module) => module.register(values))
            .then((res) => console.log(res.data)).catch(e=>console.log(e))
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

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
      </p> */}
      <Email isCreated={isCreated} isVerified={isVerified} email={email} />
    </div>
  );
}

export default Register;
