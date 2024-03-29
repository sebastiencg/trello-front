import { Navbar } from "../compoment/Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

function Card() {
  const { boardId } = useParams();
  const { listId } = useParams();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");

  const [error, setError] = useState("");

  const newCard = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();
    const token = await Jwt();

    if (token){
      try {
        const response = await axios.post(`https://django.miantsebastien.com/api/list/${listId}/card/new/`, {
          name: name,
          description: description,
          importance: importance
        },{
          headers: {'Authorization': `Bearer ${token}`}
        });

        response.data
        return navigate(`/board/${boardId}/ `);

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
                <h2 className="text-perso">creation d'une Card</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={newCard}>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="importance (min 1 max 9)"
                value={importance}
                max={9}
                min={1}
                maxLength={1}
                onChange={(e) => setImportance(e.target.value)}
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

export default Card;
