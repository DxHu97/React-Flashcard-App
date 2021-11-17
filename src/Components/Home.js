import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";
import "./Components.css"

function Home() {
    const history = useHistory();
    const [decks, setDecks] = useState([]);

    useEffect(() => {
      listDecks().then(setDecks);
    }, []);

const deleteThisDeck = (deckId) => {
    const confirmDelete = window.confirm (
        "Delete this deck? \n You will not be able to recover it"
    ) 
    if (confirmDelete){
        deleteDeck(deckId)
        history.go(0)
    }
}

return (
    <div className="container">
      <Link to="/decks/new">
        <button className="btn btn-secondary">
          Create Deck
        </button>
      </Link>

      <div className="flex">
        {decks.map((deck) => (
          <div className="border" key={deck.id}>
            <div className="flex">
              <h2>{deck.name}</h2>
              <p>{deck.cards.length} cards</p>
            </div>
            <p>{deck.description}</p>

            <div className="flex">
                <Link to={`/decks/${deck.id}`}>
                  <button className="btn btn-secondary">
                    View
                  </button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                  <button className="btn btn-primary">
                     Study
                  </button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteThisDeck(deck.id)}
                > 
                Delete
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home