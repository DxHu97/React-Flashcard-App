import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import FormComponent from "./FormComponent"

function EditCard({}) {
  const [card, setCard] = useState({ id: "", name: "", description: "" });
  const [deck, setDeck] = useState({ id: "", front: "", back: "", deckId: "" });
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const responseCard = await readCard(cardId, abortController.signal);
        const responseDeck = await readDeck(deckId, abortController.signal);
        setCard(responseCard);
        setDeck(responseDeck);
      } catch (error) {
        console.error("Error fetching in EditCard", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [cardId, deckId]);

  async function submit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const responseCard = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return responseCard;
  }
  function change({ target }) {
    setCard({
      ...card,
      [target.id]: target.value,
    });
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <span class="oi oi-home" />
              Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck: {deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      {card.id && (
        <FormComponent submit = {submit} change = {change} card = {card} />
      )}
    </div>
  );
}

export default EditCard;
