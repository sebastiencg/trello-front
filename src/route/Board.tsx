import {Link, useNavigate, useParams} from "react-router-dom";
import { Navbar } from "../compoment/Navbar.tsx";
import {useEffect, useState} from "react";
import Jwt from "../jwt/Jwt.tsx";
import axios from "axios";
import BoardOption from "../compoment/BoardOption.tsx";
import {ListOption} from "../compoment/ListOption.tsx";
import Board from "../compoment/BoardOption.tsx";
import {CardOption} from "../compoment/CardOption.tsx";

type Board = {
  id: number;
  name: string;
  description: string;
  author:string;
  datetime:string
  members: number[];
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
function BoardComponent() {
  const { id } = useParams();
  const [board, setBoard] = useState<Board>();
  const[lists, setList] = useState<List[]>([]);
  const[cards, setCard] = useState<Card[]>([]);
  const [showOverlayList, setShowOverlayList] = useState(false); // Initialiser l'état à true
  const [selectedListName, setSelectedListName] = useState(""); // État pour stocker le nom de la liste sélectionnée
  const [selectedListId, setSelectedListId] = useState<number>(0); // État pour stocker le nom de la liste sélectionnée
  const [showOverlayCard, setShowOverlayCard] = useState(false); // Initialiser l'état à true
  const [selectedCardName, setSelectedCardName] = useState(""); // État pour stocker le nom de la liste sélectionnée
  const [selectedCardId, setSelectedCardId] = useState<number>(0); // État pour stocker le nom de la liste sélectionnée
  const [selectedCardDescription, setSelectedCardDescription] = useState(""); // État pour stocker le nom de la liste sélectionnée
  const [selectedCardImportance, setSelectedCardImportance] = useState<number>(0); // État pour stocker le nom de la liste sélectionnée
  const [allList, setAllList] = useState<{ id: number; name: string }[] | undefined>();


  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      const token = await Jwt();
      if (token) {
        try {
          const responseBoard = await axios.get(`https://django.miantsebastien.com/api/board/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const storedData: string | null = localStorage.getItem('user');
          const user = storedData ? JSON.parse(storedData) : null;
          setBoard(responseBoard.data);
          if (!responseBoard.data.members.includes(user.id)){
            navigate("/boards/");
          }
          const responseList = await axios.get(`https://django.miantsebastien.com/api/board/${id}/lists/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setAllList(responseList.data)
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
      <Navbar />
      <ListOption showOverlay={showOverlayList} setShowOverlay={setShowOverlayList} selectedListName={selectedListName} selectedListId={selectedListId} />
      <CardOption showOverlayCard={showOverlayCard} setShowOverlayCard={setShowOverlayCard} selectedCardName={selectedCardName} selectedCardId={selectedCardId} selectedCardDescription={selectedCardDescription} selectedCardImportance={selectedCardImportance} selectedListId={selectedListId} allList={allList} selectedListName={selectedListName}/>
      <section className="board-info-bar">
        <div className="board-controls">
          <button className="board-title btn">
            <h2>{board?.name}</h2>
          </button>
          <BoardOption />
        </div>
      </section>

      <section className="lists-container">
        {lists.map((list) => {
          const filteredAndSortedCards = cards
            .filter((card) => card.list === list.id)
            .sort((a, b) => b.importance - a.importance);

          return (
            <div className="list" key={list.id}>
              <h3
                className="list-title btn"
                onClick={() => {
                  setSelectedListName(list.name);
                  setSelectedListId(list.id);
                  setShowOverlayList(!showOverlayList);
                }}
              >

                {list.name}{" "}
              </h3>
              <ul className="list-items">
                {filteredAndSortedCards.map((filteredCard) => (
                  <li key={filteredCard.id} onClick={() => {
                    setSelectedCardName(filteredCard.name);
                    setSelectedCardId(filteredCard.id);
                    setSelectedCardDescription(filteredCard.description)
                    setSelectedCardImportance(filteredCard.importance)
                    setSelectedListId(filteredCard.list)
                    setSelectedListName(list.name)
                    setShowOverlayCard(!showOverlayCard);
                  }}>
                    {filteredCard.name}
                    <span style={{marginLeft: '1em'}}>{filteredCard.importance}</span>
                  </li>
                ))}
              </ul>
              <Link className="add-card-btn btn no-decoration" to={`/board/${board?.id}/list/${list.id}/new/card`}>
                Add a card
              </Link>
            </div>
          );
        })}
        <Link className="add-list-btn btn no-decoration" to={`/board/${board?.id}/new/list`}>
          Add a list
        </Link>
      </section>
    </>
  )
    ;
}

export default BoardComponent;
