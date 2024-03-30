import { Navbar } from "../compoment/Navbar.tsx";
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BoardOption from "../compoment/BoardOption.tsx";
import '../stylesheet/deletemember.css'

function RemoveUser() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [author, setAuthor] = useState<string>();


  const removeUser = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = await Jwt();

    if (token) {
      if (userId==author){
        setError("Vous ne pouvez pas  supprimer l'auteur du tableau.");
      }
      else {
        try {
          const response = await axios.patch(
            `https://django.miantsebastien.com/api/board/remove/user/${id}/`,
            {
              id: userId,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(response.data);
          return navigate(`/board/${id}/`);
        } catch (error) {
          setError("Vérifiez l'ID de l'utilisateur.");
        }
      }

    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    async function board() {
      try {
        const token = await Jwt();
        if (token) {
          const boardResponse = await axios.get(
            `https://django.miantsebastien.com/api/board/${id}/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const storedData = localStorage.getItem("user");
          const user = storedData ? JSON.parse(storedData) : null;
          if (!boardResponse.data.members.includes(user.id)) {
            navigate("/boards/");
          }
          setMembers(boardResponse.data.members);
          setAuthor(boardResponse.data.author)
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    }

    board();
  }, [id, navigate]);

  return (
    <>
      <Navbar />
      <BoardOption />
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h2 className="text-perso">Supprimer un membre</h2>
            </div>
          </div>

          <form className="login-form" onSubmit={removeUser}>
            <input
              type="number"
              placeholder="ID à supprimer"
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
        <div className="members-list">
          <h3>Liste des membres :</h3>
          <ul>
            {members.map((member) => (
              <li key={member}>
                {member === author ? (
                  <span>
                    <strong>ID:</strong> {member} (Auteur)
                  </span>
                ) : (
                  <span>
                    <strong>ID:</strong> {member}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RemoveUser;
