import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export function Navbar() {

  const [state, setState] = useState(false)

  function readLocalStorage(){
    const storedData:string|null = localStorage.getItem('token');
    if (storedData){
      return setState(true)
    }
  }

  useEffect(() => {
    return readLocalStorage()
  },);
  return (
      <>
        <header className="masthead">

          <div className="boards-menu">

            <button className=" boards-btn btn">
              {state ? (
                <>
                  <span>connected </span>
                </>

              ) : (
                <span>no connected</span>
              )}
            </button>
            <div className="boards-menu">
              {state ? (
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
            {state ? (
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
