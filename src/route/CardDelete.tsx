import { Navbar } from "../compoment/Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useState} from "react";


function DeleteList() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { id } = useParams();
  const { boardId } = useParams();

  const deleteCard = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();

    const token = await Jwt();

    if (token){
      try {
        const response = await axios.delete(`https://django.miantsebastien.com/api/card/delete/${id}/`,{
          headers: {'Authorization': `Bearer ${token}`}
        });
        response
        return navigate(`/board/${boardId}`);
      } catch (error) {
        console.log(error)
        setError("Vous n'êtes pas membre du groupe ou erreur server");
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
                <h2 className="text-perso">supprimer la card</h2>
              </div>
            </div>
            <button style={{ background: 'red' ,marginBottom:'10px' }} onClick={deleteCard}>supprimer</button>

            <Link  to={`/board/${boardId}`}>
              <button >annuler</button>
            </Link>
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

export default DeleteList;
