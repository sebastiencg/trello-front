import '../stylesheet/listOption.css'
import {Link} from "react-router-dom";
interface ListOptionProps {
  showOverlay: boolean;
  setShowOverlay: (value: boolean) => void;
  selectedListName: string;
  selectedListId: number
}

export function ListOption({ showOverlay, setShowOverlay, selectedListName,selectedListId }: ListOptionProps) {
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay); // Modifier l'état dans ListOption
  };

  return (
    <div>
      {showOverlay && (
        <div className="overlay">
          <h2>{selectedListName}</h2> {/* Afficher le nom de la liste sélectionnée */}
          <ul className="list-items btn">
            <Link className="star-btn btn no-decoration" to={`/list/${selectedListId}/delete`}>
              <li>supprimer la list</li>
            </Link>
            <li>Élément 2</li>
            <li>Élément 3</li>
          </ul>
          <button onClick={toggleOverlay} className="btn">Fermer</button>
        </div>
      )}
    </div>
  );
}
