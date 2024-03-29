import '../stylesheet/Register.css';
import axios from "axios";
import { useState } from "react";
import {Navbar} from "../compoment/Navbar.tsx";
 import { useNavigate} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://django.miantsebastien.com/api/token/", {
        username: username,
        password: password,
      });
      const token = { access: response.data.access, refresh: response.data.refresh };

      const dataString = JSON.stringify(token);

      localStorage.setItem('token', dataString);
      try {
        const response = await axios.get("https://django.miantsebastien.com/api/user/", {
          headers: { 'Authorization': `Bearer ${token.access}` }
        });
        const user = { id: response.data.id, username: response.data.username };

        response.data

        const dataString = JSON.stringify(user);

        localStorage.setItem('user', dataString);

      } catch (error) {
        setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
      }

      navigate("/boards/");

    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h2 className="text-perso">Login</h2>
              <p className="text-perso2">Please enter your credentials to login.</p>
            </div>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {error && (
            <div className="alert alert-danger" role="alert">
              <p className="text-danger">{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
