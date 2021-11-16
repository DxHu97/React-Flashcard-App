import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

const Deck = () => {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const deleteCards = (cardId) => {
    const confirmDelete = window.confirm(
      "Delete this card?\n You will not be able to recover it."
    );

    if (confirmDelete) {
      deleteCard(cardId);
      history.go();
    }
  };
  const handleDelete = (deckId) => {
    const deleted = window.confirm(
      "Delete this deck?\n You will not be able to recover it."
    );

    if (deleted) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  return (
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li class="breadcrumb-item active">{deck.name}</li>
      </ol>

      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}/edit`}>
        <button className="btn btn-secondary">Edit</button>
      </Link>
      <Link to={`/decks/${deck.id}/study`}>
        <button className="btn btn-primary">Study</button>
      </Link>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button className="btn btn-primary add-cards">Add Cards</button>
      </Link>
      <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
        Delete
      </button>
      <h2 className="cards-header">Cards</h2>
      <div className="cards-list">
        {deck.cards.map((card) => (
          <div key={`${card.id}`} className="card-view">
            <div className="card-front">{card.front}</div>
            <div className="card-edit-delete">
              <div>{card.back}</div>
              <div className="edit-delete">
                <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                  <button className="btn btn-secondary">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCards(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
