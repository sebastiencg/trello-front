import {useNavigate, useParams} from "react-router-dom";
import { Navbar } from "../Navbar.tsx";
import {useEffect, useState} from "react";
import Jwt from "../jwt/Jwt.tsx";
import axios from "axios";

type Board = {
  id: number;
  name: string;
  description: string;
  author:string;
  datetime:string

};
function Board() {
  const { id } = useParams();
  const [board, setBoard] = useState<Board>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = await Jwt();
      if (token) {
        try {
          const response = await axios.get("https://django.miantsebastien.com/api/board/"+id+"/", {
            headers: {'Authorization': `Bearer ${token}`}
          });
          setBoard(response.data);

      } catch (error) {
        alert("error")
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
      <section className="board-info-bar">

        <div className="board-controls">

          <button className="board-title btn">
            <h2>{board?.name}</h2>
          </button>

          <button className="star-btn btn" aria-label="Star Board">
            <i className="far fa-star" aria-hidden="true"></i>
          </button>

        </div>
      </section>
      <section className="lists-container">

        <div className="list">

          <h3 className="list-title">Tasks to Do</h3>

          <ul className="list-items">
            <li>Complete mock-up for client website</li>
            <li>Email mock-up to client for feedback</li>
            <li>Update personal website header background image</li>
            <li>Update personal website heading fonts</li>
            <li>Add google map to personal website</li>
            <li>Begin draft of CSS Grid article</li>
            <li>Read new CSS-Tricks articles</li>
            <li>Read new Smashing Magazine articles</li>
            <li>Read other bookmarked articles</li>
            <li>Look through portfolios to gather inspiration</li>
            <li>Create something cool for CodePen</li>
            <li>Post latest CodePen work on Twitter</li>
            <li>Listen to new Syntax.fm episode</li>
            <li>Listen to new CodePen Radio episode</li>
          </ul>

          <button className="add-card-btn btn">Add a card</button>

        </div>


        <button className="add-list-btn btn">Add a list</button>

      </section>
    </>

  );
}

export default Board;
