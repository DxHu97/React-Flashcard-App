import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

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
  }, []);

  function change({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

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

  async function handleDone() {
    history.push(`/decks/${deckId}`);
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
      <form onSubmit={submit}>
        <h2>{deck.name}: Add Card</h2>
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
          Done
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
