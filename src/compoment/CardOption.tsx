import '../stylesheet/listOption.css';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { CardListChange } from "./CardListChange"; // Importez le composant CardListChange

interface CardOptionProps {
  showOverlayCard: boolean;
  setShowOverlayCard: (value: boolean) => void;
  selectedCardName: string;
  selectedCardId: number;
  selectedCardImportance: number;
  selectedCardDescription: string;
  selectedListId: number;
  selectedListName: string;
  allList:{ id: number; name: string }[] | undefined;
}

export function CardOption({ showOverlayCard, setShowOverlayCard, selectedCardName, selectedCardId, selectedCardImportance, selectedCardDescription, selectedListId, allList , selectedListName}: CardOptionProps) {
  const [showOverlayChangeList, setShowOverlayChangeList] = useState(false); // État pour afficher le composant CardListChange
  const { id } = useParams();

  const toggleOverlay = () => {
    setShowOverlayCard(!showOverlayCard);
  };

  // Fonction pour gérer le clic sur "modifier la liste"
  const handleListChangeClick = () => {
    setShowOverlayChangeList(true);
  };
  return (
    <div>
      {showOverlayCard && (

        <div className="overlay">
          <h2>titre: {selectedCardName}</h2>
          <h3>description: {selectedCardDescription}</h3>
          <h3>importance: {selectedCardImportance}</h3>
          <ul className="list-items btn">
            <Link className="star-btn btn no-decoration" to={`/board/${id}/list/${selectedListId}/card/${selectedCardId}/delete`}>
              <li>supprimer la card</li>
            </Link>
            <Link className="star-btn btn no-decoration" to={`/board/${id}/list/${selectedListId}/card/${selectedCardId}/update`}>
              <li>modifier la card</li>
            </Link>

            <li onClick={handleListChangeClick}>modifier la liste</li> {/* Ajoutez un gestionnaire d'événement onClick */}
          </ul>
          <button onClick={toggleOverlay} className="btn">Fermer</button>
        </div>
      )}
      {/* Afficher le composant CardListChange s'il est visible */}
      <CardListChange showOverlayChangeList={showOverlayChangeList} setShowOverlayChangeList={setShowOverlayChangeList} selectedListName={selectedListName} selectedListId={selectedListId} selectedCardId={selectedCardId} allList={allList} selectedCardName={selectedCardName} />
    </div>
  );
}
