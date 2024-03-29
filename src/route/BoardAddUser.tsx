import { Navbar } from "../compoment/Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import BoardOption from "../compoment/BoardOption.tsx";

function AddUser() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const addUser = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();
    const token = await Jwt();

    if (token){
      try {
        const response = await axios.post(`https://django.miantsebastien.com/api/board/add/user/${id}/`, {
          id: userId
        },{
          headers: {'Authorization': `Bearer ${token}`}
        });
        response.data
        return navigate(`/board/${id}/ `);

      } catch (error) {
        setError("vérifiez id de l'utilisateur");
      }
    }
    else {
      navigate("/login");
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <BoardOption></BoardOption>

      <div className="login-page">
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h2 className="text-perso">ajouter un membre</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={addUser}>
              <input
                type="number"
                placeholder="ID a ajouter"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button type="submit">Ajouter</button>
            </form>
            {error && (
              <div className="alert alert-danger" role="alert">
                <p className="text-danger">{error}</p>
              </div>
            )}
          </div>
        </div>
      </>
  )


  ;
}

export default AddUser;
