import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
  

function EditDeck() {
  const [deckInfo, setDeckInfo] = useState({name: "", description: ""});
  const history = useHistory();
  const {deckId} = useParams();

  useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const response = await readDeck(deckId, abortController.signal);
            setDeckInfo(response);
        } catch (error) {
            console.error("Error fetching data in editDeck", error);
        }
        return () => {
            abortController.abort();
        };
    }
    fetchData();
}, [deckId]);

async function submitInfo(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deckInfo }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
}

function changeInfo({ target }) {
    setDeckInfo({
        ...deckInfo,
        [target.name]: target.value,
    });
}

  return (
    <div>
 <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link to="/"> Home</Link>
        </li>
        <li class="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deckInfo.name}</Link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>

    <form onSubmit={submitInfo}>
                <h1>Edit Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={changeInfo}
                        value={deckInfo.name}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        type="text"
                        onChange={changeInfo}
                        value={deckInfo.description}
                        className="form-control"
                    />
                </div>
        <button
      type="button"
      class="btn btn-secondary mr-2"
      onClick={() => history.push(`/decks/${deckId}`)}
    >
      Cancel
    </button>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;