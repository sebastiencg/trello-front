import { useParams } from "react-router-dom";

function Board() {
  const { id } = useParams();
  return (
    <div>
      <h2>Board {id}</h2>
    </div>
  );
}

export default Board;
