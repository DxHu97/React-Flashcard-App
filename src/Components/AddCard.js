import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import FormComponent from "./FormComponent"

function AddCard() {
  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.error("Error fetching in AddCard", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  async function submit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createCard(
      deckId,
      { ...card },
      abortController.signal
    );
    history.go(0);
    setCard({ front: "", back: "" });
    return response;
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
              <span class="oi oi-home" /> Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <FormComponent submit = {submit} card = {card} change = {change} />
    </div>
  );
}

export default AddCard;
