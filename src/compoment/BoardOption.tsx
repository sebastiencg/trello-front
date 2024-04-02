import {Link, useParams} from "react-router-dom";
function Board() {

  const { id } = useParams();

  return (
    <>
      <section className="board-info-bar">

        <div className="board-controls">
          <button className="star-btn btn" aria-label="Star Board">
            <Link className="star-btn btn no-decoration" to={`/board/${id}`}>
              <i>Board</i>
            </Link>
          </button>
          <button className="star-btn btn" aria-label="Star Board">
            <Link className="star-btn btn no-decoration" to={`/board/${id}/update`}>
              <i>modifier Board</i>
            </Link>
          </button>
          <button className="star-btn btn" aria-label="Star Board">
            <Link className="star-btn btn no-decoration" to={`/board/${id}/delete`}>
              <i>supprimer Board</i>
            </Link>
          </button>
          <button className="star-btn btn" aria-label="Star Board">
            <Link className="star-btn btn no-decoration" to={`/board/${id}/add/user`}>
              <i>ajouter utilisateur</i>
            </Link>
          </button>
          <button className="star-btn btn" aria-label="Star Board">
            <Link className="star-btn btn no-decoration" to={`/board/${id}/remove/user`}>
              <i>supprimer utilisateur</i>
            </Link>
          </button>
        </div>
      </section>

    </>

  )
    ;
}

export default Board;
