import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Jwt from "../jwt/Jwt.tsx";
type user = {
  id: number;
  username: string;
};
export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [currentUser, setCurrentUser] = useState<user | null>();

  function readLocalStorage() {
    const storedData: string | null = localStorage.getItem('user');
    const user = storedData ? JSON.parse(storedData) : null;
    setCurrentUser(user);
  }
  async function findToken() {
    const token = await Jwt();
    if (!token) {
      if (currentUrl!=="/register"){
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    findToken()
    readLocalStorage();
  }, []);

  return (
    <>
      <header className="masthead">

        <div className="boards-menu">

          <button className=" boards-btn btn">
            {currentUser ? (
              <>
                <span>{currentUser.username} id={currentUser.id} </span>
              </>

            ) : (
              <span>no connected</span>
            )}
          </button>
          <div className="boards-menu">
            {currentUser ? (
              <>
                <Link className="boards-btn btn no-decoration" to="/boards/">
                  boards
                </Link>
              </>
            ) : null}
          </div>

        </div>


        <div className="logo">

          <h1><i className="fab fa-trello logo-icon" aria-hidden="true"></i>
            trello
          </h1>

        </div>

        <div className="user-settings">
          {currentUser ? (
            <><Link className=" boards-btn btn no-decoration" to="/logout">
              Logout
            </Link></>
          ) : (
            <><Link className=" boards-btn btn no-decoration" to="/register">
              Register
            </Link><Link className=" boards-btn btn no-decoration" to="/login">
              Login
            </Link></>
          )}

        </div>
      </header>
    </>
  );
}
