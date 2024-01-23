import { Navbar } from "../Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Board from "./Board.tsx";
import BoardOption from "../BoardOption.tsx";

function BoardDelete() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const [board, setBoard] = useState<Board>();
  const updateBoard = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();
    const token = await Jwt();

    if (token){
      try {
        const response = await axios.patch(`https://django.miantsebastien.com/api/board/update/${id}/`, {
          name: name,
          description: description
          ,
        },{
          headers: {'Authorization': `Bearer ${token}`}
        });

        response.data
        return navigate(`/board/${id}`);

      } catch (error) {
        console.log(error)
        setError("vérifiez votre formulaire");
      }
    }
    else {
      navigate("/login");
    }
  }

  useEffect(() => {
    async function fetchData() {
      const token = await Jwt();
      if (token) {
        try {
          const responseBoard = await axios.get(`https://django.miantsebastien.com/api/board/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setBoard(responseBoard.data);
        } catch (error) {
          console.log(error);
        }
      }

      else {
        navigate("/login");

      }
    }

    fetchData();
  }, [id, navigate]);

  return (
    <>
      <Navbar></Navbar>
      <BoardOption></BoardOption>

      <>
        <div className="login-page">
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h2 className="text-perso">modifier le tableau</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={updateBoard}>
              <input
                type="text"
                placeholder={board?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input  placeholder={board?.description}
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">modifier</button>
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

export default BoardDelete;
