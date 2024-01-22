import { useNavigate, useParams} from "react-router-dom";
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
type List = {
  id: number;
  name: string;
};

type Card = {
  id: number;
  name: string;
  description: string;
  importance: number;
  list: number;

};
function Board() {
  const { id } = useParams();
  const [board, setBoard] = useState<Board>();
  const[lists, setList] = useState<List[]>([]);
  const[cards, setCard] = useState<Card[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = await Jwt();
      if (token) {
        try {
          const responseBoard = await axios.get(`https://django.miantsebastien.com/api/board/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setBoard(responseBoard.data);

          const responseList = await axios.get(`https://django.miantsebastien.com/api/board/${id}/lists/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setList(responseList.data);

          const cardPromises = responseList.data.map(async (list: { id: never; }) => {
            try {
              const responseCard = await axios.get(`https://django.miantsebastien.com/api/list/${list.id}/cards/`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              return responseCard.data;
            } catch (error) {
              console.log(error);
              return [];
            }
          });

          const cardResults = await Promise.all(cardPromises);

          setCard(cardResults.flat());
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
      <section className="board-info-bar">

        <div className="board-controls">

          <button className="board-title btn">
            <h2 >{board?.name}</h2>
          </button>

          <button className="star-btn btn" aria-label="Star Board">
            <i className="far fa-star" aria-hidden="true"></i>
          </button>

        </div>
      </section>
      <section className="lists-container">

        {lists.map((list) => (
          <>
            <div className="list" >

              <h3 className="list-title" key={list.id}>{list.name}</h3>

              <ul className="list-items">
                {cards
                  .filter((card) => card.list === list.id)
                  .map((filteredCard) => (
                    <li key={filteredCard.id}>{filteredCard.name}</li>
                  ))}
              </ul>
              <button className="add-card-btn btn">Add a card</button>
            </div>
          </>
        ))}
        <button className="add-list-btn btn">Add a list</button>

      </section>
    </>

  );
}

export default Board;
