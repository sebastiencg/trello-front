import { Navbar } from "../compoment/Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import BoardOption from "../compoment/BoardOption.tsx";

function RemoveUser() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const removeUser = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();
    const token = await Jwt();

    if (token){
      try {
        const response = await axios.patch(`https://django.miantsebastien.com/api/board/remove/user/${id}/`, {
          id: userId
        },{
          headers: {'Authorization': `Bearer ${token}`}
        });
        console.log(response.data)
        return navigate(`/board/${id}/`);

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
                <h2 className="text-perso">supprimer un membre</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={removeUser}>
              <input
                type="number"
                placeholder="ID a ajouter"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button type="submit">Supprimer</button>
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

export default RemoveUser;
