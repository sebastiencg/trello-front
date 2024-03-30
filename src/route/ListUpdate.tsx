import { Navbar } from "../compoment/Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

type List = {
  id: number;
  name: string;
};


function ListUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [list, setList] = useState<List>();
  const { boardId } = useParams();

  const newList = async (e: { preventDefault: () => void; }) =>{

    e.preventDefault();
    const token = await Jwt();

   if (token){
      try {
        const response = await axios.patch(`https://django.miantsebastien.com/api/list/update/${list?.id}/`, {
          name: name
        },{
          headers: {'Authorization': `Bearer ${token}`}
        });

        response.data
        return navigate(`/board/${boardId}/ `);

      } catch (error) {
        setError("vérifiez votre formulaire");
      }
    }
    else {
      navigate("/login");
    }
  }
  async function fetchData() {
    const token = await Jwt();
    if (token) {
      try {
        const responseList = await axios.get(`https://django.miantsebastien.com/api/list/${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setList(responseList.data);
      } catch (error) {
        error
      }
    }

    else {
      navigate("/login");

    }
  }

  useEffect(() => {

    fetchData();
  }, [id, navigate,boardId]);

  return (
    <>
      <Navbar></Navbar>
      <>
        <div className="login-page">
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h2 className="text-perso">modification d'une list</h2>
              </div>
            </div>

            <form className="login-form" onSubmit={newList}>
              <input
                type="text"
                placeholder={list?.name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Modifier</button>
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

export default ListUpdate;
