import '../stylesheet/listOption.css';
import {useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import React from 'react';
import axios from "axios";
import Jwt from "../jwt/Jwt.tsx";

interface CardListChangeOptionProps {
  showOverlayChangeList: boolean;
  setShowOverlayChangeList: (value: boolean) => void;
  selectedListName: string;
  selectedListId: number;
  selectedCardId: number;
  selectedCardName:string
  allList: { id: number; name: string }[] | undefined;
}

export function CardListChange({ showOverlayChangeList, setShowOverlayChangeList, selectedListName, selectedListId, selectedCardId, allList, selectedCardName }: CardListChangeOptionProps) {
  const [selectedList, setSelectedList] = useState<number | null>(null); // État pour stocker la valeur sélectionnée
  const { id } = useParams();
  const navigate = useNavigate();
  id
  const toggleOverlay = () => {
    setShowOverlayChangeList(!showOverlayChangeList);
  };

  const handleListChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedList(Number(event.target.value)); // Convertir la valeur en nombre et la stocker dans l'état
  };

  async function changeCardList() {
    const token = await Jwt();
    if(!token){
      navigate("/login");
    }
    console.log(selectedList)
    if (selectedList==null){
      navigate(`/backUp/${id}`);
    }
    else {
      try {
        const responseListChange = await axios.put(`https://django.miantsebastien.com/api/card/update/list/${selectedCardId}/`,{
          'new_list_id':selectedList
        },{
          headers: { 'Authorization': `Bearer ${token}` }
        })
        responseListChange
        navigate(`/backUp/${id}`);
      } catch (error) {
        error
      }
    }


    console.log(selectedList, selectedCardId, selectedListId)
  }
  return (
    <div>
      {showOverlayChangeList && (
        <div className="overlay">
          <h2>{selectedCardName} </h2>
          <label>Sélectionner une liste:</label>
          <select onChange={handleListChange} value={selectedList || 'changeCardList'}>
            <option value="">{selectedListName}</option>
            {allList && allList.map((list) => (
              <React.Fragment key={list.id}>
                {list.name !== selectedListName ? (
                  <option value={list.id}>
                    {list.name}
                  </option>
                ) : null}
              </React.Fragment>
            ))}
          </select>

          <button style={{marginBottom: '10px'}} onClick={changeCardList}>modifier</button>

          <button onClick={toggleOverlay} className="btn">Fermer</button>
        </div>
      )}
    </div>
  );
}
