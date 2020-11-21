import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { signin } from "../../../services/api/auth";
import history from "../../../utils/history";
import { actions } from "../UserManager/slice";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signin({ email, password });
      dispatch(actions.setUser(res.data.user));
      Cookies.set("token", res.data.token, { expires: 365 });
      history.push("/");
    } catch (err) {
      if (err.response) alert(err.message + " " + err.response.data);
      else alert(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Connexion</h1>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          Connexion
        </button>
      </form>
    </>
  );
}
