import '../stylesheet/Register.css'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Navbar} from "../Navbar.tsx";
function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");


  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://django.miantsebastien.com/api/register/", {
        username: username,
        password: password
        ,
      });

      console.log("Réponse de l'API :", response.data);
      return navigate("/login");

    } catch (error) {
      setError("Username deja prise ou autre erreur server.");

    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h2 className="text-perso">Register</h2>
              <p className="text-perso2">Please enter your credentials to Register.</p>
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
            <button type="submit">Register</button>
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


export default Register;
