import { Navbar } from "../Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

function List() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const newList = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();
    const token = await Jwt();

    if (token){
      try {
        const response = await axios.post(`https://django.miantsebastien.com/api/board/${id}/list/new/`, {
          name: name
        },{
          headers: {'Authorization': `Bearer ${token}`}
        });

        response.data
        return navigate(`/board/${id}/ `);

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
                <h2 className="text-perso">creation d'une list</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={newList}>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

export default List;
