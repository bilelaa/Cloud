import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
function User({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    import("../../services/auth.service")
      .then((module) => module.checkAuth())
      .then((res) => {
        setAuth(res?.auth);
      })
      .catch((e) => {
        setAuth(e.auth);
      });
  }, []);

  return (
    <div>
      {" "}
      {auth === null ? <>Loading .. </> : auth ? children : <Navigate to="/" />}
    </div>
  );
}

export default User;
