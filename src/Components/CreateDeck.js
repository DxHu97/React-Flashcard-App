import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import "./Components.css";

function CreateDeck() {
  const history = useHistory();

  const [newDeck, setNewDeck] = useState({ name: "", description: "" });

  async function submit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push("/");
    return response;
  }

  function change({ target }) {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Create Deck</li>
      </ol>
      <form onSubmit={(e) => submit(e)}>
        <h1>Create Deck</h1>
        <label>Name: </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={change}
          value={newDeck.name}
          className="input"
        />
        <label>Description: </label>
        <textarea
          id="description"
          name="description"
          type="text"
          onChange={change}
          value={newDeck.description}
          className="input"
        />
        <button
          type="button"
          class="btn btn-secondary mr-2"
          onClick={() => history.push(`/`)}
        >
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
