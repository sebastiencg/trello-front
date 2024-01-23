import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
type user = {
  id: number;
  username: string;
};
export function Navbar() {

  const [user, setUser] = useState<user|null>()

  function readLocalStorage(){
    const storedData:string|null = localStorage.getItem('user');
    const user = storedData ? JSON.parse(storedData) : null;
    setUser(user)
  }

  useEffect(() => {
    return readLocalStorage()
  },);
  return (
      <>
        <header className="masthead">

          <div className="boards-menu">

            <button className=" boards-btn btn">
              {user ? (
                <>
                  <span>{user.username}.{user.id} </span>
                </>

              ) : (
                <span>no connected</span>
              )}
            </button>
            <div className="boards-menu">
              {user ? (
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
            {user ? (
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
