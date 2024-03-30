import '../stylesheet/listOption.css'
import {Link, useParams,} from "react-router-dom";
interface CardOptionProps {
  showOverlayCard: boolean;
  setShowOverlayCard: (value: boolean) => void;
  selectedCardName: string;
  selectedCardId: number
  selectedCardImportance: number
  selectedCardDescription: string

}

export function CardOption({ showOverlayCard, setShowOverlayCard, selectedCardName,selectedCardId,selectedCardImportance,selectedCardDescription }: CardOptionProps) {
  const toggleOverlay = () => {
    setShowOverlayCard(!showOverlayCard); // Modifier l'état dans ListOption
  };
  const { id } = useParams();

  return (
    <div>
      {showOverlayCard && (
        <div className="overlay">
          <h2>titre: {selectedCardName}</h2>
          <h3>description: {selectedCardDescription}</h3>
          <h3>importance: {selectedCardImportance}</h3>
          <ul className="list-items btn">
            <Link className="star-btn btn no-decoration" to={`/board/${id}/list/${selectedCardId}/delete`}>
              <li>supprimer la card</li>
            </Link>
            <Link className="star-btn btn no-decoration" to={`/board/${id}/list/${selectedCardId}/update`}>
              <li>modifier la card</li>
            </Link>
            <Link className="star-btn btn no-decoration" to={`/board/${id}/list/${selectedCardId}/update`}>
              <li>deplacer la card vers </li>
            </Link>
          </ul>
          <button onClick={toggleOverlay} className="btn">Fermer</button>
        </div>
      )}
    </div>
  );
}
