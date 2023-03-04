import { POST } from "../../utils/http";
import React, { useContext, useState } from "react";
import "./login.scss";
import AppContext from "../../store/context";
import { USERACTIONS } from "../../store/reducers";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      username: username,
      password: password,
    };

    POST("/auth/login", body)
      .then((res) => {
        if (res.status == "ok") {
          dispatch({
            type: USERACTIONS.SET_USER,
            payload: { username: username, token: res.data },
          });
          navigate("/");
        } else {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        Login
        <label>
          Username{" "}
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name=""
            id=""
            value={username}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
