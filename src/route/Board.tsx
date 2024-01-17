import { useParams } from "react-router-dom";
import { Navbar } from "../Navbar.tsx";

function Board() {
  const { id } = useParams();
  return (
    <>
      <Navbar></Navbar>
      <div>
        <h2>Board {id}</h2>
      </div>
    </>

  );
}

export default Board;
