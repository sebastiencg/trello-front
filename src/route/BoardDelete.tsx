import { Navbar } from "../Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { useState} from "react";
import BoardOption from "../BoardOption.tsx";

function DeleteBoard() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { id } = useParams();
  const deleteBoard = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();

    const token = await Jwt();

    if (token){
      try {
        const response = await axios.delete(`https://django.miantsebastien.com/api/board/delete/${id}/`,{
          headers: {'Authorization': `Bearer ${token}`}
        });

        response.data
        return navigate(`/boards/`);

      } catch (error) {
        console.log(error)
        setError("Vous n'êtes pas l'auteur de ce tableau ou erreur server");
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

      <>
        <div className="login-page">
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h2 className="text-perso">supprimer le tableau</h2>
              </div>
            </div>
              <button  onClick={deleteBoard}>supprimer</button>
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

export default DeleteBoard;
