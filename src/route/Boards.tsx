import { Navbar } from "../compoment/Navbar.tsx";
import axios from "axios";
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import '../stylesheet/boards.scss'
import Jwt from "../jwt/Jwt.tsx";


type Board = {
  id: number;
  name: string;
  description: string;

};
function Boards() {
  const [items, setItems] = useState<Board[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {

      const token = await Jwt();
      if (token){
        try {
          if (token) {

            const response = await axios.get("https://django.miantsebastien.com/api/boards/", {
              headers: {'Authorization': `Bearer ${token}`}
            });
            console.log(response.data)
            setItems(response.data);
          }
        } catch (error) {
          console.log(error)
          navigate("/login");
        }
      }else {
        navigate("/login");

      }

    }

    fetchData();
  }, [navigate]);
  return (
    <>
      <Navbar></Navbar>
      <main>
        <ol className="gradient-list">
          {items.map((item) => (
            <li className="btn" key={item.id}>
              <Link to={`/board/${item.id}`} className="text-perso btn no-decoration">
                <strong>
                  {item.name}
                </strong>
              </Link>
            </li>
          ))}
        </ol>
        <Link className=" boards-btn btn no-decoration" to="/board/new/">
          Créer un nouveau tableau
        </Link>
      </main>
    </>
);
}

export default Boards;
