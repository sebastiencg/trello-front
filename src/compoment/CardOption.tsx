import '../stylesheet/listOption.css'
import {Link, useParams,} from "react-router-dom";
interface CardOptionProps {
  showOverlayCard: boolean;
  setShowOverlayCard: (value: boolean) => void;
  selectedCardName: string;
  selectedCardId: number
}

export function CardOption({ showOverlayCard, setShowOverlayCard, selectedCardName,selectedCardId }: CardOptionProps) {
  const toggleOverlay = () => {
    setShowOverlayCard(!showOverlayCard); // Modifier l'état dans ListOption
  };
  const { id } = useParams();

  return (
    <div>
      {showOverlayCard && (
        <div className="overlay">
          <h2>{selectedCardName}</h2> {/* Afficher le nom de la liste sélectionnée */}
          <ul className="list-items btn">
            <Link className="star-btn btn no-decoration" to={`/board/${id}/list/${selectedCardId}/delete`}>
              <li>supprimer la list</li>
            </Link>
            <Link className="star-btn btn no-decoration" to={`/board/${id}/list/${selectedCardId}/update`}>
              <li>modifier la list</li>
            </Link>
          </ul>
          <button onClick={toggleOverlay} className="btn">Fermer</button>
        </div>
      )}
    </div>
  );
}
