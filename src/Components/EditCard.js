import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";

function EditCard() {
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
  }, []);

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
      [target.name]: target.value,
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
      <form onSubmit={submit}>
        <h2>Edit Card</h2>
        <label>Front</label>
        <textarea
          id="front"
          name="front"
          type="text"
          onChange={change}
          value={card.front}
          className="form-control"
        />
        <label>Back</label>
        <textarea
          id="back"
          name="back"
          type="text"
          onChange={change}
          value={card.back}
          className="form-control"
        />
        <button
          type="button"
          class="btn btn-secondary mr-2"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Cancel
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard;
