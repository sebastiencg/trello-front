import { Navbar } from "../Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Boards() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const newBoard = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();
    const token = await Jwt();

    if (token){
      try {
        const response = await axios.post("https://django.miantsebastien.com/api/board/new/", {
          name: name,
          description: description
          ,
        },{
          headers: {'Authorization': `Bearer ${token}`}
        });

        console.log("Réponse de l'API :", response.data);

        return navigate("/boards/");

      } catch (error) {
        setError("vérifiez votre formulaire");
      }
    }
    else {
      navigate("/login");
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <>
        <div className="login-page">
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h2 className="text-perso">creation d'un tableau</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={newBoard}>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input  placeholder="description"
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">Créer</button>
            </form>
            {error && (
              <div className="alert alert-danger" role="alert">
                <p className="text-danger">{error}</p>
              </div>
            )}
          </div>
        </div>
      </>

    </>

  );
}

export default Boards;
